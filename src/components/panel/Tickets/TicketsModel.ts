import { ListProps } from '@/components/commons/List/@types/List';

export const ticketsFilters = {
  search: '',
  card: '',
  user: '',
  status: '',
  date_from: '',
  date_to: '',
  perPage: '25',
};

export const ticketsTableHeaders: Pick<ListProps, 'headers'> = {
  headers: [
    {
      key: 'name',
      customLabel: 'ticket.name',
    },
    {
      key: 'card',
    },
    {
      key: 'user',
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
