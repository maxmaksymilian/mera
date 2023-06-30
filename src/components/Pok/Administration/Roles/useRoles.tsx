import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { useEffect } from 'react';

import { Without } from '@/lib/api';
import { useApiMutation } from '@/hooks/api/useApiMutation';
import { useApiQuery } from '@/hooks/api/useApiQuery';

import { FiltersProps } from '@/components/commons/Filters/Filters';
import { useForm } from '@/components/commons/Form/useForm';
import { ListObjectType } from '@/components/commons/List/@types/List';

import {
  adminsFilters as initialValues,
  adminsPokTableHeaders,
} from './RolesModel';

export const useRoles = () => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const filters: Without<FiltersProps, 'children'> = {
    form: useForm({
      initialValues,
      onSubmit: () => {
        null;
      },
    }),
  };

  const { data, status, refetch, isLoading, ...query } = useApiQuery({
    route: 'POK_ALL_ROLES',
    values: {
      ...filters.form.values,
    },
  });

  const { mutate } = useApiMutation({
    route: 'POK_ALL_ROLES',
    method: 'DELETE',
  });

  const roles = data?.items || [];
  const pagination = data?.pagination || null;

  const table: ListObjectType = {
    ...adminsPokTableHeaders,
    cardType: 'primary',
    form: filters.form,
    records: roles.reduce(
      (prev: any[], current: any) => [
        ...prev,
        {
          id: current.id,
          cardData: {
            title: current.name,
          },
          data: {
            name: {
              value: current.name,
            },
            usersCount: {
              value: current.count,
            },
          },
          actions: [
            {
              icons: [
                {
                  name: 'edit',
                  handleClick: () =>
                    router.push(`/pok/administracja/role/edycja/${current.id}`),
                },
                {
                  name: 'delete',
                  handleClick: () =>
                    mutate({ id: current.id }, { onSuccess: () => refetch() }),
                },
              ],
            },
          ],
        },
      ],
      []
    ),
  };

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.form.values, router.query?.page]);

  return {
    table,
    status,
    isLoading,
    filters,
    pagination,
    refetch,
    t,
    router,
    ...query,
  };
};
