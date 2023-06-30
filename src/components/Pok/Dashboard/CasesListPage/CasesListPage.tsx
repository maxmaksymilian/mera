import { Dispatch, SetStateAction } from 'react';

import { Container } from '@/components/commons/Container';
import { List } from '@/components/commons/List/List';
import { Modal } from '@/components/commons/Modal/Modal';
import { PaginationListWrapper } from '@/components/commons/Pagination/PaginationListWrapper';
import { NewCaseForm } from '@/components/panel/MyCases/components/NewCaseForm/NewCaseForm';

import { newTabs } from './CasesListModel';
import { CasesListFilters } from './components/CasesListFilters';
import { CasesListTabs } from './components/CasesListTabs';
import { useCasesListPage } from './useCasesListPage';

type CasesListPageComponentProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const CasesListPageComponent = ({
  isOpen,
  setIsOpen,
}: CasesListPageComponentProps) => {
  const {
    activeTab,
    filters,
    table,
    setActiveTab,
    refetch,
    pagination,
    ...query
  } = useCasesListPage();
  return (
    <>
      <Container className='md:px-0'>
        <CasesListTabs {...{ activeTab, setActiveTab, tabs: newTabs }} />
        <CasesListFilters {...{ filters }} />
        <PaginationListWrapper {...{ pagination, form: filters.form }}>
          <List {...{ ...table, ...query }} />
        </PaginationListWrapper>
      </Container>
      <Modal {...{ isOpen, handleClose: () => setIsOpen(false) }}>
        <NewCaseForm
          handleClose={() => setIsOpen(false)}
          handleReload={() => refetch()}
          isCustomerService
        />
      </Modal>
    </>
  );
};
