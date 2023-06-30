import useTranslation from 'next-translate/useTranslation';

import { Filters } from '@/components/commons/Filters/Filters';
import { RangeDatepicker } from '@/components/commons/Form/Fields/RangeDatepicker';
import { SearchInput } from '@/components/commons/Form/Fields/SearchInput';
import { Select } from '@/components/commons/Form/Fields/Select/Select';
import { List } from '@/components/commons/List/List';
import { PaginationListWrapper } from '@/components/commons/Pagination/PaginationListWrapper';

import { useTransactionHistorySection } from './useTransactionHistorySection';

export type TransactionHistorySectionProps = {
  id: string;
};

export interface IHistoryRecord {
  created_at: string;
  end_date: string;
  id: string;
  name: string;
  order_data: string;
  order: {
    created_at: string;
    order_number: string;
  };
  price: number;
  start_date: string;
  status: 'not_active' | 'active';
  validity: number;
}

export const TransactionHistorySection = ({
  id,
}: TransactionHistorySectionProps) => {
  const { t } = useTranslation('common');
  const { table, status, filters, isLoading, refetch, pagination } =
    useTransactionHistorySection({
      id,
    });

  return (
    <section className='w-full pt-6 md:pt-10'>
      <div className='border-cloud pb-6 md:border-b'>
        <h2 className='py-5 text-base font-bold leading-6 text-black md:py-0 md:text-md md:leading-8'>
          {t('transactionHistory')}
        </h2>
      </div>
      <div>
        <div className='pb-14'>
          <Filters {...{ ...filters, className: 'my-5' }}>
            <SearchInput
              name='search'
              className='h-12'
              placeholder='searchTransactions'
            />
            <Select
              name='type'
              options={[]}
              placeholder='ticketType'
              className='md:w-[200px]'
              isClear={true}
            />
            <RangeDatepicker
              fromName='date_from'
              toName='date_to'
              minYear={10}
              fromPlaceholder='choiceDate'
              toPlaceholder='choiceDate'
            />
          </Filters>
          <PaginationListWrapper
            {...{ form: filters.form, pagination, refetch }}
          >
            <List
              {...{
                id: 'my-transactions-table',
                form: filters.form,
                ...table,
                status,
                isLoading,
              }}
            />
          </PaginationListWrapper>
        </div>
      </div>
    </section>
  );
};
