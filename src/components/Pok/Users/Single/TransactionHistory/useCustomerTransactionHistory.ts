import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { useEffect } from 'react';

import { Without } from '@/lib/api';
import { useApiQuery } from '@/hooks/api/useApiQuery';
import { useFileDownload } from '@/hooks/useFileDownload';

import { FiltersProps } from '@/components/commons/Filters/Filters';
import { useForm } from '@/components/commons/Form/useForm';
import { ListObjectType } from '@/components/commons/List/@types/List';

import {
  customerTransactionHistoryFilters as initialValues,
  customerTransactionHistoryTableHeaders,
} from './customerTransactionHistoryModel';

export const useCustomerTransactionHistory = (id: string) => {
  const { t } = useTranslation('common');
  const { query, push } = useRouter();
  const { getFile } = useFileDownload({
    route: 'POK_TRANSACTION_DOWNLOAD_PDF',
    params: { userId: typeof query.id === 'string' ? query.id : '' },
  });

  const filters: Without<FiltersProps, 'children'> = {
    form: useForm({
      initialValues,
      onSubmit: () => {
        null;
      },
    }),
  };

  const { data, refetch, ...apiQuery } = useApiQuery({
    route: 'POK_CUSTOMER_TRANSACTION_HISTORY',
    params: { id },
    values: { ...filters.form.values, page: Number(query.page) || 1 },
  });

  const transactions = data?.items || [];
  const pagination = data?.pagination || null;

  const createCase = (transactionId: string) => {
    push(`/pok/lista-spraw?userId=${id}&transactionId=${transactionId}`);
  };

  const table: ListObjectType = {
    ...customerTransactionHistoryTableHeaders,
    cardType: 'secondary',
    form: filters.form,
    records: transactions.reduce(
      (prev: any[], current: any) => [
        ...prev,
        {
          id: current.id,
          cardData: {
            number: current.number,
            title: current.title,
            description: current.description,
            link: `/pok/historia-transakcji/${current.id}`,
            linkButton: {
              link: `/pok/historia-transakcji/${current.id}`,
              content: 'viewDetails',
            },
          },
          data: {
            order_number: {
              value: current.order_number,
            },
            created_at: {
              value: current.created_at,
            },
            price: {
              value: current.price,
            },
            status: {
              value: current.status,
            },
            document_type: {
              value: t(current.document_type),
            },
          },
          actions: [
            {
              key: 'createCase',
              handleClick: () => createCase(current.id),
            },
            {
              key: 'downloadPdf',
              expired: current.status !== 'completed',
              handleClick: () =>
                getFile({
                  values: {
                    params: {
                      id: current.id,
                    },
                  },
                }),
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
  }, [filters.form.values, query?.page]);

  return {
    filters,
    data,
    table,
    pagination,
    t,
    ...apiQuery,
  };
};
