import { getCookie } from 'cookies-next';

import { API_ENDPOINTS, ApiKeysType } from '@/hooks/api/apiEndpoints';

type fetchRequestProps = {
  route: ApiKeysType;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  getFile?: boolean;
  refresh?: boolean;
  id?: string;
  params?: { [key: string]: string };
  token?: string;
  expires_at?: string;
  values?: {
    [key: string]:
      | string
      | number
      | boolean
      | File
      | null
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      | { [key: string]: any }
      | { [key: string]: any }[];
  };
};

export type Without<T, K> = Pick<T, Exclude<keyof T, K>>;

const API_BASE = '/api/v1';

const getCSRFToken = async (): Promise<string> => {
  await fetch(`${API_ENDPOINTS.CSRF_TOKEN.endpoint}`);
  const token = await getCookie('XSRF-TOKEN');
  return typeof token === 'string' ? token : '';
};

const generateRequestUrl = ({
  route,
  method,
  values,
  id,
  params,
}: Without<fetchRequestProps, 'token'>) => {
  const activeParams = params ? Object.keys(params) : [];
  const activeId = id || (!activeParams.includes('id') ? values?.id : null);
  let url = `${API_BASE}${API_ENDPOINTS[route].endpoint}${
    activeId ? `/${activeId}` : ''
  }`;

  if (params || values?.params) {
    let allParams: { [key: string]: any } = {};

    if (params) {
      allParams = { ...params };
    }

    if (values?.params && typeof values?.params === 'object') {
      allParams = { ...allParams, ...values.params };
    }

    Object.entries(allParams).forEach(([key, value]) => {
      url = url.replace(`{${key}}`, value);
    });
  }

  if (!values) {
    return url;
  }

  switch (method) {
    case 'GET':
      return Object.entries(values).reduce((prev, current) => {
        if (Array.isArray(current[1]) && current[1] !== null) {
          let updatedUrl = prev;
          current[1].forEach((item, index) => {
            Object.entries(item).forEach((children) => {
              updatedUrl =
                updatedUrl +
                `${updatedUrl.includes('?') ? '&' : '?'}${
                  current[0]
                }[${index}][${children[0]}]=${children[1]}`;
            });
          });
          return updatedUrl;
        } else {
          return current[1] === '' || !current[1] || current[0] === 'params'
            ? prev
            : prev +
                `${prev.includes('?') ? '&' : '?'}${current[0]}=${current[1]}`;
        }
      }, url);
    default:
      return url;
  }
};

const generateFormData = ({
  values,
  method,
}: Pick<fetchRequestProps, 'values' | 'method'>) => {
  const form = new FormData();

  form.append('_method', method);

  if (!values) {
    return form;
  }

  for (const [key, value] of Object.entries(values)) {
    if (value === '' || !value) {
      continue;
    }

    if (Array.isArray(value)) {
      value.map((item, index) => {
        if (
          typeof item === 'object' &&
          item !== null &&
          !(item instanceof File)
        ) {
          for (const [itemKey, itemValue] of Object.entries(item)) {
            form.append(
              `${key.replaceAll('_', '.')}[${index}][${itemKey}]`,
              null === itemValue
                ? ''
                : itemValue instanceof File
                ? itemValue
                : itemValue
                ? itemValue.toString()
                : ''
            );
          }
        } else {
          form.append(`${key.replaceAll('_', '.')}[]`, item);
        }
      });
    } else {
      form.append(
        key.replaceAll('_', '.'),
        null === value ? '' : value instanceof File ? value : value.toString()
      );
    }
  }

  return form;
};

export const fetchRequest = async ({
  route,
  method,
  token,
  expires_at,
  values,
  id,
  params,
  getFile,
  refresh,
}: fetchRequestProps) => {
  try {
    const tokenCSRF = await getCSRFToken();

    let tokenData: { token?: string; expires_at?: string } = {
      token,
      expires_at,
    };

    if (expires_at && expires_at !== '' && refresh && route !== 'AUTH_LOGOUT') {
      const refreshTime = new Date(expires_at).getTime() - 600000;
      const today = new Date().getTime();

      if (refreshTime <= today) {
        const data = await fetchRequest({
          route: 'AUTH_REFRESH_TOKEN',
          method: 'GET',
          token,
        });
        if (data?.data) {
          tokenData = data?.data;
        }
      }
    }

    const requestOptions = {
      method: method === 'GET' ? method : 'POST',
      headers: {
        Accept: 'application/json',
        'X-XSRF-TOKEN': tokenCSRF,
        Authorization: `Bearer ${tokenData.token}`,
      },
      body: method === 'GET' ? null : generateFormData({ values, method }),
    };

    const url = generateRequestUrl({ route, id, method, values, params });

    const res = await fetch(url, requestOptions);

    const { status } = await res;

    if (status !== 200) {
      const { message, data, errors } = await res.json();
      return {
        error:
          message || data.message || 'Something went wrong during fetching!',
        errors: errors || [],
        status,
        tokenData,
        reset_token: data.reset_token || null,
      };
    } else if (getFile) {
      return { data: await res.blob(), status, tokenData };
    } else {
      const { success, data } = await res.json();

      if (success) {
        return await { data, status, tokenData };
      }
    }
  } catch {
    return { error: 'Something went wrong during fetching!' };
  }
};
