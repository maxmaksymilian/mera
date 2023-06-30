import useTranslation from 'next-translate/useTranslation';
import { ChangeEvent, useEffect, useState } from 'react';

import { useApiQuery } from '@/hooks/api/useApiQuery';

import { Customer, SearchUserDropdownProps } from './SearchUserDropdown';
export const useSearchUserDropdown = ({
  name,
  handleChange,
}: Pick<SearchUserDropdownProps, 'name' | 'handleChange'>) => {
  const { t } = useTranslation('form');
  const [search, setSearch] = useState<string>('');
  const [selected, setSelected] = useState<string | null>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {
    data: customers,
    status,
    refetch,
  } = useApiQuery({
    route: 'POK_ALL_CUSTOMERS',
    values: {
      search: search,
    },
  });

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
    setSelected(value);
  };

  const getFullName = (id: string) => {
    const { profile } = customers.find(
      (customer: Customer) => customer.id === id
    );
    return profile.first_name + ' ' + profile.last_name;
  };

  const handleOptionClick = (data: Customer | null) => {
    if (data === null) {
      setSelected(null);
      setSearch('');
      setIsOpen(false);
      handleChange?.(null);
      return;
    }

    const chosen = getFullName(data.id);

    if (!chosen) return;
    setSelected(chosen);
    setIsOpen(false);
    handleChange?.(data);
  };

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, selected]);

  return {
    customers,
    isOpen,
    selected,
    status,
    getFullName,
    handleOptionClick,
    handleSearch,
    setSearch,
    setSelected,
    setIsOpen,
    t,
  };
};
