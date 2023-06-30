import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

import { Button } from '@/components/commons/Button';
import { List } from '@/components/commons/List/List';
import { Modal } from '@/components/commons/Modal/Modal';
import { PaginationListWrapper } from '@/components/commons/Pagination/PaginationListWrapper';
import { CreateUserForm } from '@/components/Forms/MyUsers/CreateUser/CreateUserForm';

import { useMyUsers } from './useMyUsers';

export type MyUsersProps = {
  openModal: boolean;
};

export const MyUsers = ({ openModal }: MyUsersProps) => {
  const { query } = useRouter();
  const { t } = useTranslation('common');
  const {
    table,
    refetch,
    isOpen,
    setIsOpen,
    filters,
    pagination,
    ...apiQuery
  } = useMyUsers({
    openModal,
  });

  return (
    <div className='pb-4'>
      <div className='w-full pt-4 pb-2 text-sm md:w-52 md:pt-0 md:pb-12 md:text-base'>
        <Button fullWidth handleClick={() => setIsOpen(true)}>
          {t('buttonAddUser')}
        </Button>
      </div>
      <PaginationListWrapper {...{ pagination, form: filters.form }}>
        <List {...{ id: 'my-users-table', ...table, ...apiQuery }} />
      </PaginationListWrapper>
      <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
        <CreateUserForm
          {...{
            route: 'POK_PROFILE_MY_USERS',
            method: 'POST',
            params: { id: typeof query.id === 'string' ? query.id : '' },
            handleClose: () => setIsOpen(false),
            handleSubmit: () => {
              refetch();
            },
          }}
        />
      </Modal>
    </div>
  );
};
