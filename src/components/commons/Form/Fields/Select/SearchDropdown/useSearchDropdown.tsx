import { useFormikContext } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import { useEffect } from 'react';
import { ChangeEvent, useState } from 'react';

import { useAppStore } from '@/lib';

export type ValueType = string | number | readonly string[] | undefined;

type UseSearchDropdown = {
  name: string;
  data: any;
  isFullName?: boolean;
};

export const useSearchDropdown = ({
  name,
  data,
  isFullName,
}: UseSearchDropdown) => {
  const { personalData } = useAppStore();
  const { t } = useTranslation('form');
  const { getFieldMeta, setFieldValue } = useFormikContext();
  const { value, error } = getFieldMeta<ValueType>(name);
  const [search, setSearch] = useState<string>('');
  const [selected, setSelected] = useState<string | null>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
    setSelected(value);
  };

  const getFullName = (id: string, data: any) => {
    const { profile } = data.find((item: any) => item.id === id);
    return profile.first_name + ' ' + profile.last_name;
  };

  const getOptionName = (option: any) => {
    const isOption = data
      ? data.find(({ id }: { id: string }) => id === option)
      : null;

    return isFullName
      ? isOption?.profile.first_name + ' ' + isOption?.profile.last_name || ' '
      : isOption?.order_number;
  };

  const getTransactionName = (option: any) => option.order_number;

  const handleClickOutside = () => {
    setIsOpen(false);
    setSearch('');
    setSelected(selected ? selected : null);
  };

  const handleOptionClick = (option: any) => {
    if (option === null) {
      setSearch('');
      setSelected(null);
      setIsOpen(false);
      setFieldValue(name, null);
      return;
    }

    const chosen = isFullName
      ? getFullName(option.id, data)
      : getTransactionName(option);

    if (!chosen) return;

    setFieldValue(name, option.id);
    setSelected(chosen);
    setIsOpen(false);
  };

  useEffect(() => {
    let initialValue = value;

    if (name === 'guardian') {
      initialValue = personalData.id;
      setFieldValue('guardian', initialValue);
    }

    if (initialValue) {
      const val = getOptionName(initialValue);
      val && setSelected(val);
    }
  }, [data]);

  return {
    error,
    search,
    isOpen,
    selected,
    getFullName,
    handleClickOutside,
    handleOptionClick,
    handleSearch,
    setSearch,
    setSelected,
    setIsOpen,
    t,
  };
};
