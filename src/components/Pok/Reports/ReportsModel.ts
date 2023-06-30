import { Without } from '@/lib/api';

import { ListProps } from '@/components/commons/List/@types/List';
import { FilterType } from '@/components/commons/List/components/Table/components/TableFilter/TableFilterModel';

export type ReportsOrdersType = {
  created_at: string;
  id: string;
  name: string;
  order_number: string;
  payment_method: string;
  price: number;
  price_sum: number;
  price_sum_net: number;
  price_vat: number;
  ticket_count: string;
  ticket_id: string;
};

export type ReportsTicketsType = {
  id: string;
  name: string;
  price: number;
  price_sum: number;
  price_sum_net: number;
  price_vat: number;
  ticket_count: string;
  type: string;
};

export type ReportsCardsType = {
  id: string;
  type: string;
  number: number;
  expiration_date?: string;
  name: string;
  owner_id: string;
  owner_name: string;
  user_id: string;
  user_name: string;
  lock_date: string;
};

type InitialValuesType = {
  search: string;
  perPage: string;
  filter: Without<FilterType[], 'second_value'>;
};

export const initialValues: InitialValuesType = {
  search: '',
  perPage: '25',
  filter: [],
};

export const reportsTableHeaders: {
  [key: string]: Pick<ListProps, 'headers'>;
} = {
  orders: {
    headers: [
      {
        key: 'created_at',
        type: 'DATE_TIME',
      },
      {
        key: 'payment_method',
      },
      {
        key: 'order_number',
      },
      {
        key: 'name',
        customLabel: 'reports.name',
      },
      {
        key: 'price',
        type: 'PRICE',
        customLabel: 'reports.price',
      },
      {
        key: 'ticket_count',
      },
      {
        key: 'price_sum_net',
        type: 'PRICE',
      },
      {
        key: 'price_vat',
        type: 'PRICE',
      },
      {
        key: 'price_sum',
        type: 'PRICE',
      },
    ],
  },
  tickets: {
    headers: [
      {
        key: 'type',
        customLabel: 'reports.seller',
      },
      {
        key: 'name',
        customLabel: 'reports.name',
      },
      {
        key: 'price',
        type: 'PRICE',
        customLabel: 'reports.price',
      },
      {
        key: 'ticket_count',
      },
      {
        key: 'price_sum_net',
        type: 'PRICE',
      },
      {
        key: 'price_vat',
        type: 'PRICE',
      },
      {
        key: 'price_sum',
        type: 'PRICE',
      },
    ],
  },
  cards: {
    headers: [
      {
        key: 'type',
        customLabel: 'reports.cards.type',
      },
      {
        key: 'number',
        customLabel: 'reports.cards.number',
      },
      {
        key: 'expiration_date',
      },
      {
        key: 'name',
        customLabel: 'reports.cards.name',
      },
      {
        key: 'owner_id',
      },
      {
        key: 'owner_name',
      },
      {
        key: 'user_id',
      },
      {
        key: 'user_name',
      },
      {
        key: 'lock_date',
        type: 'DATE_TIME',
      },
    ],
  },
};
