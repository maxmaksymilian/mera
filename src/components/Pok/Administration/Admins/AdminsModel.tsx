import { ListProps } from '@/components/commons/List/@types/List';

export const adminsFilters = {
  search: '',
  role: '',
  perPage: '25',
};

export const adminsPokTableHeaders: Pick<ListProps, 'headers'> = {
  headers: [
    {
      key: 'email',
    },
    {
      key: 'name',
    },
    {
      key: 'role',
    },
    {
      key: 'status',
      type: 'STATUS',
    },
  ],
};
