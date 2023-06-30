import { ListProps } from '@/components/commons/List/@types/List';
import { Skeleton } from '@/components/commons/Skeleton/Skeleton';

import { TableFilter } from './components/TableFilter/TableFilter';
import { TableHeader } from './components/TableHeader';
import { TableRecord } from './components/TableRecord/TableRecord';
import { useTable } from './useTable';

export const Table = ({
  isLoading,
  isRefetching,
  status,
  id,
  headers,
  records,
  showFilters,
  form,
  updateFilter,
}: ListProps) => {
  const { activeKey, sortHandler } = useTable({ form });

  if ((isLoading && status !== 'success') || (isRefetching && !showFilters)) {
    return <Skeleton {...{ count: records?.length || 8, height: 60 }} />;
  }

  return (
    <section className='min-h-sm w-full'>
      <div>
        <div className='w-full overflow-auto pb-14'>
          <table id={id} className='section-table w-full'>
            <thead>
              <tr className='h-14'>
                {headers.map(({ key, customLabel }) => (
                  <TableHeader
                    key={key}
                    {...{
                      name: key,
                      customLabel,
                      activeKey,
                      handleSort: () => sortHandler(key),
                    }}
                  />
                ))}
              </tr>
            </thead>
            <tbody>
              {showFilters && updateFilter
                ? headers.map(({ key }) => (
                    <TableFilter
                      key={key}
                      {...{ field: key, updateData: updateFilter }}
                    />
                  ))
                : null}
              {records.map(({ id, ...props }) => (
                <TableRecord key={id} {...{ headers, id, ...props }} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
