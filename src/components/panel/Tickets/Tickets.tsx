import { globalStatusOptions } from '@/lib/options/options';

import { Button } from '@/components/commons/Button';
import { Container } from '@/components/commons/Container';
import { Filters } from '@/components/commons/Filters/Filters';
import { RangeDatepicker } from '@/components/commons/Form/Fields/RangeDatepicker';
import { SearchInput } from '@/components/commons/Form/Fields/SearchInput';
import { CardSelect } from '@/components/commons/Form/Fields/Select/DynamicVariants/CardSelect';
import { UserSelect } from '@/components/commons/Form/Fields/Select/DynamicVariants/UserSelect';
import { Select } from '@/components/commons/Form/Fields/Select/Select';
import { Link } from '@/components/commons/Link';
import { List } from '@/components/commons/List/List';
import { Modal } from '@/components/commons/Modal/Modal';
import { PaginationListWrapper } from '@/components/commons/Pagination/PaginationListWrapper';

import { ReturnModal } from './ReturnModal/ReturnModal';
import { useMyTicketsTable } from './useTickets';

export const Tickets = () => {
  const {
    returnTicket,
    refetch,
    setReturnTicket,
    ticketName,
    ticketId,
    cardId,
    filters,
    table,
    pagination,
    ...query
  } = useMyTicketsTable();

  return (
    <>
      <div className='-mt-14 mb-5 md:hidden'>
        <Link href='/panel/moje-bilety/zamowienie'>
          <Button fullWidth>Kup Bilet</Button>
        </Link>
      </div>
      <Container className='px-0 md:pl-0'>
        <div className='mx-auto mt-0 max-w-screen-lg pb-5'>
          <Filters {...filters}>
            <SearchInput
              name='search'
              className='h-12'
              placeholder='searchTicket'
            />
            <CardSelect
              name='card'
              className='md:w-[200px]'
              placeholder='card'
            />
            <UserSelect
              name='user'
              value=''
              className='md:w-[200px]'
              placeholder='user'
              isClear
              clearLabel='clear'
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
        </div>
        <PaginationListWrapper form={filters.form} pagination={pagination}>
          <List
            {...{
              id: 'my-tickets-table',
              ...table,
              ...query,
            }}
          />
        </PaginationListWrapper>
        <Modal isOpen={returnTicket} handleClose={() => setReturnTicket(null)}>
          <ReturnModal
            {...{
              ...returnTicket,
              ticketName,
              ticketId,
              cardId,
              handleRefresh: () => refetch(),
              handleClose: () => setReturnTicket(null),
            }}
          />
        </Modal>
      </Container>
    </>
  );
};
