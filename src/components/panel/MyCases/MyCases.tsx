import { useEffect } from 'react';

import { List } from '@/components/commons/List/List';
import { Modal } from '@/components/commons/Modal/Modal';
import { PaginationListWrapper } from '@/components/commons/Pagination/PaginationListWrapper';
import { RefundCaseForm } from '@/components/Forms/Tickets/Refund/RefundCaseForm';

import { CasesFilters } from './components/CasesFilters';
import { NewCaseForm } from './components/NewCaseForm/NewCaseForm';
import { useMyCases } from './useMyCases';

export const MyCases = () => {
  const {
    filters,
    isOpen,
    isOpenReturn,
    table,
    pagination,
    router,
    refetch,
    setIsOpen,
    setIsOpenReturn,
    ...query
  } = useMyCases();

  useEffect(() => {
    const ticketReturn: any = router.query.ticketReturn;
    return setIsOpenReturn(ticketReturn);
  }, [router.query.ticketReturn, setIsOpenReturn]);

  return (
    <>
      <div className='mt-5 md:mt-0'>
        <CasesFilters {...filters} />
        <PaginationListWrapper {...{ form: filters.form, pagination, refetch }}>
          <List {...{ ...table, ...query }} />
        </PaginationListWrapper>
        {isOpen && (
          <Modal isOpen={isOpen} handleClose={() => setIsOpen(false)}>
            <NewCaseForm
              handleClose={() => setIsOpen(false)}
              handleReload={() => refetch()}
            />
          </Modal>
        )}
        {isOpenReturn && (
          <Modal
            isOpen={isOpenReturn}
            handleClose={() => setIsOpenReturn(false)}
          >
            <RefundCaseForm
              name={router.query.name}
              ticket={router.query.ticket}
              card={router.query.card}
              handleClose={() => setIsOpenReturn(false)}
              handleReload={() => refetch()}
            />
          </Modal>
        )}
      </div>
    </>
  );
};
