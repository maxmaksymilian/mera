import { ListProps } from '@/components/commons/List/@types/List';

export const customerCardsPageFilters = {
  search: '',
  date_from: '',
  date_to: '',
  perPage: '25',
};

export const customerCardsPageHeaders: Pick<ListProps, 'headers'> = {
  headers: [
    {
      key: 'name',
      customLabel: 'cards.name',
    },
    {
      key: 'card',
    },
    {
      key: 'number',
      customLabel: 'cards.number',
    },
    {
      key: 'expiration_date',
      customLabel: 'cards.expirationDate',
    },
    {
      key: 'active_tickets',
      customLabel: 'cards.activeTickets',
    },
    {
      key: 'status',
      type: 'STATUS',
    },
  ],
};
