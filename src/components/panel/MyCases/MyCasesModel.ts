import { ListProps } from '@/components/commons/List/@types/List';

type User = {
  id: string;
  profile: {
    first_name: string;
    last_name: string;
  };
};

export type MyCaseType = {
  id: string;
  description: string;
  number: string;
  status: string;
  title: string;
  type: string;
  created_at: string;
  updated_at: string;
  user: User;
  employee?: User;
};

export const casesFilters = {
  search: '',
  date_from: '',
  date_to: '',
  type: '',
  status: '',
  perPage: '25',
};

export const options = {
  type: [
    { name: 'complaint', value: 'complaint' },
    { name: 'refund', value: 'refund' },
  ],
  status: [
    { name: 'new', value: 'new' },
    { name: 'in_progress', value: 'in_progress' },
    { name: 'closed', value: 'closed' },
  ],
};

export const casesHeaders: Pick<ListProps, 'headers'> = {
  headers: [
    {
      key: 'number',
      customLabel: 'case.number',
      type: 'LINK',
      columnRecordClassName: 'text-navy',
    },
    {
      key: 'created_at',
      customLabel: 'case.created_at',
      type: 'DATE_TIME',
    },
    {
      key: 'updated_at',
      customLabel: 'case.updated_at',
      type: 'DATE_TIME',
    },
    {
      key: 'type',
    },
    {
      key: 'status',
      type: 'STATUS',
    },
    {
      key: 'description',
      type: 'CONTENT',
    },
  ],
};
