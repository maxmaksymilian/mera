import { Filters } from '@/components/commons/Filters/Filters';
import { RangeDatepicker } from '@/components/commons/Form/Fields/RangeDatepicker';
import { SearchInput } from '@/components/commons/Form/Fields/SearchInput';
import { List } from '@/components/commons/List/List';
import { PaginationListWrapper } from '@/components/commons/Pagination/PaginationListWrapper';

import { useCustomerTransactionHistory } from './useCustomerTransactionHistory';

export type CustomerTransactionHistoryProps = {
  id: string;
};

export const CustomerTransactionHistory = ({
  id,
}: CustomerTransactionHistoryProps) => {
  const { filters, table, pagination, ...apiQuery } =
    useCustomerTransactionHistory(id);

  return (
    <>
      <Filters {...{ ...filters }}>
        <SearchInput name='search' className='h-12' placeholder='searchCase' />
        <RangeDatepicker
          fromName='date_from'
          toName='date_to'
          minYear={10}
          fromPlaceholder='choiceDate'
          toPlaceholder='choiceDate'
        />
      </Filters>
      <PaginationListWrapper {...{ pagination, form: filters.form }}>
        <List
          {...{
            id: 'my-tickets-table',
            ...table,
            ...apiQuery,
          }}
        />
      </PaginationListWrapper>
    </>
  );
};
