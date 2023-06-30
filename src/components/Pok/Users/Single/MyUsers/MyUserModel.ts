import { ListProps } from '@/components/commons/List/@types/List';

export type MyUserType = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  pesel?: string;
  status: string; //Status type
  telephone: {
    prefix: string;
    telephone: string;
  };
  card: {
    id: string;
    name: string;
  };
  wallet: {
    id: string;
    points: number;
    price: number;
  };
};

export const myUserFilters = {
  perPage: '25',
};

export const userTableHeaders: Pick<ListProps, 'headers'> = {
  headers: [
    {
      key: 'full_name',
      type: 'LINK',
      columnRecordClassName: 'text-navy',
    },
    {
      key: 'card',
    },
    {
      key: 'pesel',
    },
    {
      key: 'status',
      type: 'STATUS',
    },
    {
      key: 'wallet',
      type: 'PRICE',
    },
  ],
};

export const wizardData = {
  stepOne: {
    headline: 'Dane adresowe',
  },
  stepTwo: {
    name: 'Michał',
  },
};
