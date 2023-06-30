import { downloadOptions } from '@/lib/options/options';

import { Dropdown } from '@/components/commons/Dropdown';
import { List } from '@/components/commons/List/List';
import { PaginationListWrapper } from '@/components/commons/Pagination/PaginationListWrapper';

import { useReports } from './useReports';

export type ReportsProps = {
  type: 'tickets' | 'cards' | 'orders';
};

export const Reports = ({ type }: ReportsProps) => {
  const { table, exportData, filters, pagination, ...apiQuery } = useReports({
    type,
  });

  return (
    <div className='flex flex-col gap-12 pb-4'>
      <div className='flex items-center justify-end'>
        <Dropdown
          {...{
            icon: 'download-file',
            prefix: 'downloadFile',
            options: downloadOptions,
            handleClick: (value) => exportData(value),
          }}
        >
          exportFilters
        </Dropdown>
      </div>
      <PaginationListWrapper {...{ pagination, form: filters.form }}>
        <List {...{ id: `raports-${type}-table`, ...table, ...apiQuery }} />
      </PaginationListWrapper>
    </div>
  );
};
