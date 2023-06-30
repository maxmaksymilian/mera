import { globalStatusOptions } from '@/lib/options/options';

import { Filters } from '@/components/commons/Filters/Filters';
import { RangeDatepicker } from '@/components/commons/Form/Fields/RangeDatepicker';
import { SearchInput } from '@/components/commons/Form/Fields/SearchInput';
import { Select } from '@/components/commons/Form/Fields/Select/Select';
import { List } from '@/components/commons/List/List';
import { Modal } from '@/components/commons/Modal/Modal';
import { PaginationListWrapper } from '@/components/commons/Pagination/PaginationListWrapper';

import { CustomerTicketBlockModal } from './CustomerTicketBlockModal/CustomerTicketBlockModal';
import { useMyTicketsTable } from './useCustomerTickets';

type CustomerTicketsPageProps = {
  id: string;
};

export const CustomerTickets = ({ id }: CustomerTicketsPageProps) => {
  const {
    activeTicket,
    filters,
    table,
    pagination,
    setActiveTicket,
    refetch,
    ...apiQuery
  } = useMyTicketsTable(id);

  return (
    <>
      <Filters {...filters}>
        <SearchInput
          name='search'
          className='h-12'
          placeholder='searchTicket'
        />
        <Select
          name='status'
          options={globalStatusOptions}
          placeholder='status'
          className='md:w-[200px]'
          isClear
          clearLabel='clear'
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
        <List
          {...{
            id: 'my-tickets-table',
            ...table,
            ...apiQuery,
          }}
        />
      </PaginationListWrapper>
      <Modal isOpen={activeTicket} handleClose={() => setActiveTicket(null)}>
        <CustomerTicketBlockModal
          {...{
            ...activeTicket,
            userId: id,
            handleRefresh: () => refetch(),
            handleClose: () => setActiveTicket(null),
          }}
        />
      </Modal>
    </>
  );
};
