import { useFormikContext } from 'formik';
import { useRef, useState } from 'react';

import { useOnClickOutside } from '@/hooks/useOnClickOutside';

import { PhonePrefixSelectProps, ValueType } from './PhonePrefixSelect';

export const usePhonePrefixSelect = ({
  options,
  ...props
}: PhonePrefixSelectProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { getFieldMeta, setFieldValue } = useFormikContext();
  const { value, error } = getFieldMeta<ValueType>(props.name);
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
      setFieldValue(props.name, null);
      return;
    }
    setFieldValue(props.name, option);
    setIsOpen(false);
  };

  return {
    ref,
    value,
    error,
    isOpen,
    setIsOpen,
    getOptionName,
    valueName,
    handleOptionClick,
  };
};
