import { ListProps } from '@/components/commons/List/@types/List';

export const customerTransactionHistoryFilters = {
  search: '',
  date_from: '',
  date_to: '',
  perPage: '25',
};

export const customerTransactionHistoryTableHeaders: Pick<
  ListProps,
  'headers'
> = {
  headers: [
    {
      key: 'order_number',
      customLabel: 'transaction.number',
    },
    {
      key: 'created_at',
      customLabel: 'transaction.created_at',
      type: 'DATE_TIME',
    },
    {
      key: 'price',
      type: 'PRICE',
    },
    {
      key: 'status',
      type: 'STATUS',
    },
    {
      key: 'document_type',
      customLabel: 'type',
    },
  ],
};
