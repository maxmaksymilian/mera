import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { useEffect, useState } from 'react';

import { Without } from '@/lib/api';
import { useApiQuery } from '@/hooks/api/useApiQuery';

import { FiltersProps } from '@/components/commons/Filters/Filters';
import { useForm } from '@/components/commons/Form/useForm';
import { ListObjectType } from '@/components/commons/List/@types/List';

import {
  usersFilters as initialValues,
  usersPokTableHeaders,
} from './UsersModel';

export const useUsers = () => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [isOpen, setIsOpen] = useState(false);
  const filters: Without<FiltersProps, 'children'> = {
    form: useForm({
      initialValues,
      onSubmit: () => {
        null;
      },
    }),
  };

  const { data, status, refetch, isLoading, ...query } = useApiQuery({
    route: 'POK_USERS',
    values: {
      ...filters.form.values,
    },
  });

  const userPok = data?.items || [];
  const pagination = data?.pagination || null;

  const table: ListObjectType = {
    ...usersPokTableHeaders,
    cardType: 'primary',
    form: filters.form,
    records: userPok.reduce(
      (prev: any[], current: any) => [
        ...prev,
        {
          id: current.id,
          cardData: {
            title: current.name,
          },
          data: {
            type: {
              value: t(`account.type.${current.type}`),
            },
            name: {
              value: `${current.profile.first_name} ${current.profile.last_name}`,
              properties: {
                link:
                  current.type === 'main'
                    ? `/pok/baza-klientow/${current.id}/dane-klienta`
                    : `/pok/baza-klientow/${current.parent.id}/uzytkownicy/${current.id}`,
              },
            },
            pesel: {
              value: current.profile.pesel && current.profile.pesel,
            },
            address: {
              value: current.address && current.address.city,
            },
            registered_at: {
              value: current.registered_at,
            },
            status: {
              value: current.status,
            },
          },
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
    isOpen,
    isLoading,
    filters,
    pagination,
    setIsOpen,
    refetch,
    ...query,
  };
};
