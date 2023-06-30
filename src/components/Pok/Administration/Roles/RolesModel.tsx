import { ListProps } from '@/components/commons/List/@types/List';

export const adminsFilters = {
  search: '',
  perPage: '25',
};

export const adminsPokTableHeaders: Pick<ListProps, 'headers'> = {
  headers: [
    {
      key: 'name',
      customLabel: 'roleName',
    },
    {
      key: 'usersCount',
    },
  ],
};
