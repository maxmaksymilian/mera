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
  initialValues,
  transactionHistoryHeaders,
} from './transactionHistoryModel';

export const useTransactionHistory = () => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const { getFile } = useFileDownload({ route: 'TRANSACTION_DOWNLOAD_PDF' });
  const { getFile: getList } = useFileDownload({
    route: 'TRANSACTION_LIST_DOWNLOAD_PDF',
  });
  const filters: Without<FiltersProps, 'children'> = {
    form: useForm({
      initialValues,
      onSubmit: () => {
        null;
      },
    }),
    button: {
      children: 'exportToPdf',
      handleClick: () => getList({ values: filters.form.values }),
    },
  };

  const { data, refetch, ...query } = useApiQuery({
    route: 'PROFILE_ORDER_HISTORY',
    values: {
      ...filters.form.values,
      page: typeof router.query?.page === 'string' ? router.query.page : '1',
    },
  });

  const transactions = data?.items || [];
  const pagination = data?.pagination || null;

  const table: ListObjectType = {
    ...transactionHistoryHeaders,
    cardType: 'primary',
    form: filters.form,
    records: transactions.reduce(
      (prev: any[], current: any) => [
        ...prev,
        {
          id: current.id,
          cardData: {
            title: `Transakcja ${current.order_number}`,
          },
          data: {
            created_at: {
              value: current.created_at,
              properties: {
                link: '#',
              },
            },
            order: {
              value: current.order_number,
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
              key: 'downloadPdf',
              expired: current.status !== 'completed',
              handleClick: () => {
                current?.id &&
                  getFile({ values: { params: { id: current.id } } });
              },
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
  }, [filters.form.values, router.query.page]);

  return { filters, table, pagination, ...query };
};
