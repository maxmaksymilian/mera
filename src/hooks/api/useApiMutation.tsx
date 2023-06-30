import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { useAppStore } from '@/lib';
import { fetchRequest } from '@/lib/api';

import { ApiKeysType } from './apiEndpoints';

export type UseApiMutationProps = {
  route: ApiKeysType;
  getFile?: boolean;
  id?: string;
  params?: { [key: string]: string };
  method: 'POST' | 'PUT' | 'DELETE' | 'GET';
};

export type ValueType = {
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

export const useApiMutation = ({ ...props }: UseApiMutationProps) => {
  const { token, expires_at, clearState, setToken } = useAppStore();
  const { pathname, push } = useRouter();
  const [error, setError] = useState<string | null>(); //TODO to delete
  const [errors, setErrors] = useState<{ [key: string]: string } | undefined>();

  const { mutate, isLoading } = useMutation({
    mutationFn: (values: ValueType) => {
      setError(null);
      return fetchRequest({
        token,
        refresh: true,
        expires_at,
        values,
        ...props,
      })
        .then((data) => {
          if (data?.reset_token) {
            return data;
          }

          if (data?.error) {
            setError(data.error);
          }

          if (data?.errors) {
            setErrors(data.errors);
          }

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
            } else if (
              pathname.includes('/pok') &&
              !pathname.includes('/auth')
            ) {
              push('/pok');
            }
          } else if (props.route !== 'AUTH_LOGOUT') {
            setToken({
              token: data?.tokenData?.token || '',
              expires_at: data?.tokenData?.expires_at || '',
            });
          }

          return data;
        })
        .catch((err) => err);
    },
    useErrorBoundary: true,
  });

  return { mutate, isLoading, error, errors };
};
