import { Button } from '@/components/commons/Button';
import { Filters } from '@/components/commons/Filters/Filters';
import { SearchInput } from '@/components/commons/Form/Fields/SearchInput';
import { Link } from '@/components/commons/Link';
import { List } from '@/components/commons/List/List';
import { PaginationListWrapper } from '@/components/commons/Pagination/PaginationListWrapper';

import { useRoles } from './useRoles';

export const Roles = () => {
  const { filters, table, status, isLoading, pagination, t, ...query } =
    useRoles();

  return (
    <>
      <Link href='/pok/administracja/role/dodawanie'>
        <Button variant='primary'>
          {t('pages.administration.roles.buttonText')}
        </Button>
      </Link>
      <Filters {...filters}>
        <SearchInput
          name='search'
          className='h-12'
          placeholder='typeRoleName'
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
    </>
  );
};
