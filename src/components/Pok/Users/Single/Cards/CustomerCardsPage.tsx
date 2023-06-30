import { Button } from '@/components/commons/Button';
import { Container } from '@/components/commons/Container';
import { Filters } from '@/components/commons/Filters/Filters';
import { RangeDatepicker } from '@/components/commons/Form/Fields/RangeDatepicker';
import { SearchInput } from '@/components/commons/Form/Fields/SearchInput';
import { List } from '@/components/commons/List/List';
import { Modal } from '@/components/commons/Modal/Modal';
import { PaginationListWrapper } from '@/components/commons/Pagination/PaginationListWrapper';

import { CardBlockModalContent } from './CardBlockModal/CardBlockModalContent';
import { AddCardModal } from './components/AddCardModal';
import { useCustomerCardPage } from './useCustomerCardPage';

export type CustomerCardsPageProps = {
  id: string;
  openModal: boolean;
};

export const CustomerCardsPage = ({
  id,
  openModal,
}: CustomerCardsPageProps) => {
  const {
    activeCard,
    filters,
    isLoading,
    isRefetching,
    table,
    status,
    isOpen,
    pagination,
    setActiveCard,
    handleRefresh,
    setIsOpen,
    refetch,
    t,
  } = useCustomerCardPage({ id, openModal });

  return (
    <>
      <Container className='md:px-0'>
        <Button handleClick={() => setIsOpen(true)}>
          {t('pok.customerData.cards.addCard')}
        </Button>
        <Filters {...{ ...filters, className: 'my-10' }}>
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
          <List
            {...{
              id: 'customer-cards',
              ...table,
              status,
              isLoading,
              isRefetching,
            }}
          />
        </PaginationListWrapper>
      </Container>
      <Modal isOpen={isOpen} handleClose={() => setIsOpen(false)}>
        <AddCardModal
          {...{
            route: 'POK_CUSTOMER_CARDS',
            method: 'POST',
            params: {
              id,
            },
            access: 'admin',
            handleClose: () => setIsOpen(false),
            handleSubmit: () => {
              setIsOpen(false);
              refetch();
            },
          }}
        />
      </Modal>
      <Modal isOpen={activeCard} handleClose={() => setActiveCard(null)}>
        <CardBlockModalContent
          {...{
            userId: id,
            ...activeCard,
            handleRefresh,
            handleClose: () => setActiveCard(null),
          }}
        />
      </Modal>
    </>
  );
};
