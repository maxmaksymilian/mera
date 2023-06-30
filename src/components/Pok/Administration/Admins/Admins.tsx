import { Button } from '@/components/commons/Button';
import { Filters } from '@/components/commons/Filters/Filters';
import { SearchInput } from '@/components/commons/Form/Fields/SearchInput';
import { RoleSelect } from '@/components/commons/Form/Fields/Select/DynamicVariants/RoleSelect';
import { Link } from '@/components/commons/Link';
import { List } from '@/components/commons/List/List';
import { Modal } from '@/components/commons/Modal/Modal';
import { PaginationListWrapper } from '@/components/commons/Pagination/PaginationListWrapper';

import { ResetModal } from './ResetModal/ResetModal';
import { useAdmins } from './useAdmins';

export const Admins = () => {
  const {
    filters,
    table,
    status,
    isLoading,
    pagination,
    t,
    activeUser,
    setActiveUser,
    ...query
  } = useAdmins();

  return (
    <>
      <Link href='/pok/administracja/uzytkownicy/dodawanie'>
        <Button variant='primary'>
          {t('pages.administration.users.buttonText')}
        </Button>
      </Link>
      <Filters {...filters}>
        <SearchInput name='search' className='h-12' placeholder='searchAdmin' />
        <RoleSelect
          name='role'
          placeholder='roles'
          className='md:w-[200px]'
          isClear
          clearLabel='clear'
        />
      </Filters>
      <PaginationListWrapper {...{ pagination, form: filters.form }}>
        <List
          {...{
            ...table,
            status,
            isLoading,
            ...query,
          }}
        />
      </PaginationListWrapper>
      <Modal isOpen={activeUser} handleClose={() => setActiveUser(null)}>
        {activeUser ? (
          <ResetModal
            {...{
              id: activeUser.id,
              email: activeUser.email,
              handleClose: () => setActiveUser(null),
            }}
          />
        ) : null}
      </Modal>
    </>
  );
};
