import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { useAppStore } from '@/lib';
import { fetchRequest } from '@/lib/api';

import { ApiKeysType } from './apiEndpoints';

export type UseApiQueryProps = {
  route: ApiKeysType;
  getFile?: boolean;
  id?: string;
  refresh?: boolean;
  params?: { [key: string]: string };
  values?: { [key: string]: string | number | boolean | File | null };
};

export const useApiQuery = ({ refresh, ...props }: UseApiQueryProps) => {
  const { token, expires_at, clearState, setToken } = useAppStore();
  const { pathname, push } = useRouter();
  const { route, id, params } = props;
  const paramsArr = params ? [...Object.values(params)] : [];

  const { data, ...query } = useQuery({
    queryKey: [route, id, ...paramsArr],
    queryFn: () =>
      fetchRequest({
        token,
        expires_at,
        refresh,
        method: 'GET',
        ...props,
      }).then((data) => {
        if (data?.status && data.status === 401) {
          clearState();

          if (pathname.includes('/panel') && token === '') {
            push('/auth/logowanie');
          } else if (
            pathname.includes('/pok') &&
            !pathname.includes('/auth') &&
            token === ''
          ) {
            push('/pok/auth/logowanie');
          }
        } else if (data?.status && data.status === 403) {
          toast('Brak dostepu', {
            position: 'bottom-left',
            autoClose: 5000,
            hideProgressBar: false,
            type: 'error',
            theme: 'colored',
          });
          if (pathname.includes('/panel')) {
            push('/');
          } else if (pathname.includes('/pok') && !pathname.includes('/auth')) {
            push('/pok');
          }
        } else if (refresh) {
          setToken({
            token: data?.tokenData?.token || '',
            expires_at: data?.tokenData?.expires_at || '',
          });
        }

        return data;
      }),
    useErrorBoundary: true,
  });

  return { data: data?.data, ...query };
};
