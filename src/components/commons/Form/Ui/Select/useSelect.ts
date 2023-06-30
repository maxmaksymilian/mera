import { useRef, useState } from 'react';

import { useOnClickOutside } from '@/hooks/useOnClickOutside';

import { SelectProps, ValueType } from './Select';

export const useSelect = ({ options, value, onChange }: SelectProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useOnClickOutside(ref, () => setIsOpen(false));

  const getOptionName = (option: ValueType) => {
    const isOption = options
      ? options.find(({ value }) => value === option)
      : null;

    return isOption?.name || ' ';
  };

  const valueName = getOptionName(value);

  const handleOptionClick = (option: string | null) => {
    if (option === null) {
      setIsOpen(false);
      onChange(null);
      return;
    }
    onChange(option);
    setIsOpen(false);
  };

  return {
    ref,
    value,
    isOpen,
    setIsOpen,
    getOptionName,
    valueName,
    handleOptionClick,
  };
};
