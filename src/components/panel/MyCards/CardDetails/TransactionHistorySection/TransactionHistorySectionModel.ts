import { ListProps } from '@/components/commons/List/@types/List';

export const transactionsFilters = {
  search: '',
  type: '',
  date_from: '',
  date_to: '',
  perPage: '25',
};

export const transactionsTableHeaders: Pick<ListProps, 'headers'> = {
  headers: [
    {
      key: 'order',
      customLabel: 'transaction.number',
      type: 'LINK',
      columnRecordClassName: 'text-navy',
    },
    {
      key: 'created_at',
      customLabel: 'transaction.created_at',
      type: 'DATE',
    },
    {
      key: 'name',
      customLabel: 'ticket.name',
    },
    {
      key: 'price',
      type: 'PRICE',
    },
    {
      key: 'start_date',
      customLabel: 'ticket.start_date',
      type: 'DATE_TIME',
    },
    {
      key: 'end_date',
      customLabel: 'ticket.end_date',
      type: 'DATE_TIME',
    },
    {
      key: 'status',
      type: 'STATUS',
    },
  ],
};
