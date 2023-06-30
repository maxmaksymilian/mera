import { List } from '@/components/commons/List/List';
import { PaginationListWrapper } from '@/components/commons/Pagination/PaginationListWrapper';

import { CasesFilters } from './components/CasesFilters';
import { useCases } from './useCases';

export const Cases = () => {
  const { table, pagination, filters, ...query } = useCases();

  return (
    <div className='mt-5 md:mt-0'>
      <CasesFilters {...filters} />
      <PaginationListWrapper {...{ form: filters.form, pagination }}>
        <List {...{ ...table, ...query }} />
      </PaginationListWrapper>
    </div>
  );
};
