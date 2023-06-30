import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { useEffect, useState } from 'react';

import { Without } from '@/lib/api';
import { useApiMutation } from '@/hooks/api/useApiMutation';
import { useApiQuery } from '@/hooks/api/useApiQuery';

import { FiltersProps } from '@/components/commons/Filters/Filters';
import { useForm } from '@/components/commons/Form/useForm';
import { ListObjectType } from '@/components/commons/List/@types/List';

import {
  adminsFilters as initialValues,
  adminsPokTableHeaders,
} from './AdminsModel';

export const useAdmins = () => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [activeUser, setActiveUser] = useState<any | null>(null);
  const filters: Without<FiltersProps, 'children'> = {
    form: useForm({
      initialValues,
      onSubmit: () => {
        null;
      },
    }),
  };

  const { data, status, refetch, isLoading, ...query } = useApiQuery({
    route: 'POK_ADMINS',
    values: {
      ...filters.form.values,
    },
  });

  const { mutate } = useApiMutation({
    route: 'POK_ADMINS',
    method: 'DELETE',
  });

  const admins = data?.items || [];
  const pagination = data?.pagination || null;

  const table: ListObjectType = {
    ...adminsPokTableHeaders,
    cardType: 'primary',
    form: filters.form,
    records: admins.reduce(
      (prev: any[], current: any) => [
        ...prev,
        {
          id: current.id,
          cardData: {
            title: current.name,
          },
          data: {
            email: {
              value: current.email,
            },
            name: {
              value: `${current.profile.first_name} ${current.profile.last_name}`,
            },
            role: {
              value: current.roles.reduce(
                (prev: string, current: { name: string }) =>
                  prev === '' ? current.name : `${prev}, ${current.name}`,
                ''
              ),
            },
            status: {
              value: current.status,
            },
          },
          actions: [
            {
              key: 'passwordReset',
              handleClick: () => setActiveUser(current),
            },
            {
              icons: [
                {
                  name: 'edit',
                  handleClick: () =>
                    router.push(
                      `/pok/administracja/uzytkownicy/edycja/${current.id}`
                    ),
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
    activeUser,
    setActiveUser,
    isLoading,
    filters,
    pagination,
    refetch,
    t,
    router,
    ...query,
  };
};
