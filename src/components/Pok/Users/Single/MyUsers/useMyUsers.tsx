import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Without } from '@/lib/api';
import { useApiQuery } from '@/hooks/api/useApiQuery';

import { FiltersProps } from '@/components/commons/Filters/Filters';
import { useForm } from '@/components/commons/Form/useForm';
import {
  ListObjectType,
  ListRecordType,
} from '@/components/commons/List/@types/List';

import {
  myUserFilters as initialValues,
  MyUserType,
  userTableHeaders,
} from './MyUserModel';
import { MyUsersProps } from './MyUsers';

export const useMyUsers = ({ openModal }: MyUsersProps) => {
  const { query } = useRouter();
  const [isOpen, setIsOpen] = useState(openModal);

  const filters: Without<FiltersProps, 'children'> = {
    form: useForm({
      initialValues,
      onSubmit: () => {
        null;
      },
    }),
  };

  const { data, refetch, ...apiQuery } = useApiQuery({
    route: 'POK_PROFILE_MY_USERS',
    params: { id: typeof query.id === 'string' ? query.id : '' },
    values: {
      page: typeof query?.page === 'string' ? query.page : '1',
    },
  });

  const users = data?.items || [];
  const pagination = data?.pagination || null;

  const table: ListObjectType = {
    ...userTableHeaders,
    cardType: 'primary',
    form: filters.form,
    records: users.reduce(
      (prev: ListRecordType[], current: MyUserType): ListRecordType[] => [
        ...prev,
        {
          id: current.id,
          cardData: {
            title: `${current.first_name} ${current.last_name}`,
            linkButton: {
              link: `/pok/baza-klientow/${query.id}/uzytkownicy/${current.id}`,
              content: 'details',
            },
          },
          data: {
            full_name: {
              value: `${current.first_name} ${current.last_name}`,
              properties: {
                link: `/pok/baza-klientow/${query.id}/uzytkownicy/${current.id}`,
              },
            },
            card: {
              value: current.card?.name || '',
            },
            pesel: {
              value: current.pesel || '',
            },
            status: {
              value: current.status,
            },
            wallet: {
              value: current.wallet.price,
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
  }, [filters.form.values, query?.page]);

  return {
    table,
    refetch,
    isOpen,
    pagination,
    setIsOpen,
    filters,
    ...apiQuery,
  };
};
