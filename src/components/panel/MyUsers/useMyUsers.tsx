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

export const useMyUsers = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const filters: Without<FiltersProps, 'children'> = {
    form: useForm({
      initialValues,
      onSubmit: () => {
        null;
      },
    }),
  };

  const { data, refetch, ...query } = useApiQuery({
    route: 'PROFILE_MY_USERS',
    values: {
      ...filters.form.values,
      page: typeof router.query?.page === 'string' ? router.query.page : '1',
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
              link: `/panel/moi-uzytkownicy/${current.id}`,
              content: 'details',
            },
          },
          data: {
            full_name: {
              value: `${current.first_name} ${current.last_name}`,
              properties: {
                link: `/panel/moi-uzytkownicy/${current.id}`,
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
  }, [filters.form.values, router.query?.page]);

  return {
    table,
    isOpen,
    pagination,
    setIsOpen,
    filters,
    refetch,
    ...query,
  };
};
