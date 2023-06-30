import { ListProps } from '@/components/commons/List/@types/List';

export const tabs = ['pok.dashboard.activeCases', 'pok.dashboard.archiveCases'];

export const newTabs = [
  {
    name: 'active',
    label: 'pok.dashboard.activeCases',
  },
  {
    name: 'archived',
    label: 'pok.dashboard.archiveCases',
  },
];

export const casesListFilters = {
  search: '',
  date_from: '',
  date_to: '',
  type: '',
  employee: '',
  status: '',
  perPage: '25',
};

export const casesListHeaders: Pick<ListProps, 'headers'> = {
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
      key: 'employee',
      customLabel: 'operator',
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
