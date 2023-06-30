import { globalStatusOptions } from '@/lib/options/options';

import { Filters } from '@/components/commons/Filters/Filters';
import { SearchInput } from '@/components/commons/Form/Fields/SearchInput';
import { Select } from '@/components/commons/Form/Fields/Select/Select';
import { List } from '@/components/commons/List/List';
import { Modal } from '@/components/commons/Modal/Modal';
import { PaginationListWrapper } from '@/components/commons/Pagination/PaginationListWrapper';

import { AddCustomer } from './components/AddCustomer/AddCustomer';
import { useUsers } from './useUsers';

export type UsersType = {
  isOpen: boolean;
  setIsOpen: (e: boolean) => void;
};

export const Users = ({ isOpen, setIsOpen }: UsersType) => {
  const { filters, table, status, isLoading, pagination, refetch, ...query } =
    useUsers();

  return (
    <>
      <Filters {...filters}>
        <SearchInput
          name='search'
          className='h-12'
          placeholder='searchCustomer'
        />
        <SearchInput name='city' className='h-12' placeholder='searchCity' />
        <Select
          name='status'
          options={globalStatusOptions}
          placeholder='status'
          className='md:w-[200px]'
          isClear
          clearLabel='clear'
        />
      </Filters>
      <PaginationListWrapper {...{ pagination, form: filters.form }}>
        <List
          {...{
            id: 'users-pok-table',
            ...table,
            status,
            isLoading,
            ...query,
          }}
        />
      </PaginationListWrapper>
      <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
        <AddCustomer {...{ handleReload: () => refetch() }} />
      </Modal>
    </>
  );
};
