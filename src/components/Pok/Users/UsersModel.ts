import { ListProps } from '@/components/commons/List/@types/List';

export const usersFilters = {
  search: '',
  city: '',
  status: '',
  perPage: '25',
};

export const usersPokTableHeaders: Pick<ListProps, 'headers'> = {
  headers: [
    {
      key: 'type',
      customLabel: 'account_type',
    },
    {
      key: 'name',
      customLabel: 'client',
      type: 'LINK',
      columnRecordClassName: 'text-navy',
    },
    {
      key: 'pesel',
    },
    {
      key: 'address',
      customLabel: 'city',
    },
    {
      key: 'registered_at',
      customLabel: 'register_date',
      type: 'DATE',
    },
    {
      key: 'status',
      type: 'STATUS',
    },
  ],
};
