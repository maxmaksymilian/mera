import { Filters } from '@/components/commons/Filters/Filters';
import { RangeDatepicker } from '@/components/commons/Form/Fields/RangeDatepicker';
import { SearchInput } from '@/components/commons/Form/Fields/SearchInput';
import { List } from '@/components/commons/List/List';
import { PaginationListWrapper } from '@/components/commons/Pagination/PaginationListWrapper';

import { useTransactionHistory } from './useTransactionHistory';

export const TransactionHistory = () => {
  const { filters, table, pagination, ...query } = useTransactionHistory();

  return (
    <>
      <Filters {...{ ...filters, className: 'my-5' }}>
        <SearchInput
          name='search'
          className='h-12'
          placeholder='searchTransactions'
        />
        <RangeDatepicker
          fromName='date_from'
          toName='date_to'
          minYear={10}
          fromPlaceholder='choiceDate'
          toPlaceholder='choiceDate'
        />
      </Filters>
      <PaginationListWrapper {...{ pagination, form: filters.form }}>
        <List {...{ id: 'transaction-history', ...table, ...query }} />
      </PaginationListWrapper>
    </>
  );
};
