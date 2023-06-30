import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Without } from '@/lib/api';
import { useApiQuery } from '@/hooks/api/useApiQuery';

import { FiltersProps } from '@/components/commons/Filters/Filters';
import { useForm } from '@/components/commons/Form/useForm';
import { ListObjectType } from '@/components/commons/List/@types/List';

import { TransactionHistorySectionProps } from './TransactionHistorySection';
import { transactionsTableHeaders } from './TransactionHistorySectionModel';
import { transactionsFilters as initialValues } from './TransactionHistorySectionModel';

export const useTransactionHistorySection = ({
  id,
}: TransactionHistorySectionProps) => {
  const router = useRouter();
  const filters: Without<FiltersProps, 'children'> = {
    form: useForm({
      initialValues,
      onSubmit: () => {
        null;
      },
    }),
  };

  const { data, status, refetch, isLoading } = useApiQuery({
    route: 'PROFILE_MY_CARDS_HISTORY',
    params: { id },
    values: {
      ...filters.form.values,
      page: typeof router.query?.page === 'string' ? router.query.page : '1',
    },
  });

  const transactions = data?.items || [];
  const pagination = data?.pagination || null;

  const table: ListObjectType = {
    ...transactionsTableHeaders,
    cardType: 'primary',
    records: transactions.reduce(
      (prev: any[], current: any) => [
        ...prev,
        {
          id: current.id,
          cardData: {
            title: current.name,
          },
          data: {
            order: {
              value: current.order.order_number,
              properties: {
                link: '#',
              },
            },
            created_at: {
              value: current.created_at,
            },
            name: {
              value: current.name,
              hideOnMobile: true,
            },
            price: {
              value: current.price,
            },
            start_date: {
              value: current.start_date,
            },
            end_date: {
              value: current.end_date,
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
    refetch,
    isLoading,
    filters,
    pagination,
  };
};
