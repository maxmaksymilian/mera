import { useEffect, useState } from 'react';

import { clsxm } from '@/lib';

import { Icon } from '@/components/commons/Icon/Icon';

export type CustomSelectInputProps = {
  name: string;
  error?: string;
  label?: string;
  value?: string;
  fakeValue?: boolean;
  placeholder?: string;
  options?: { name: string; value: string }[];
  className?: string;
  setFieldValue?: (
    field: string,
    value: string,
    shouldValidate?: boolean
  ) => void;
  handleChange?: (value: string) => void;
};

export const CustomSelectInput = ({
  name,
  label,
  value,
  fakeValue,
  placeholder,
  options = [],
  error,
  className,
  setFieldValue,
  handleChange,
}: CustomSelectInputProps) => {
  const [isSelected, setIsSelected] = useState<{
    name: string;
    value: string;
  } | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const getOptionName = (option: string) => {
    return options.find(({ value }) => value === option);
  };

  const handleOptionClick = (option: string | null) => {
    if (option === null) {
      setIsSelected(null);
      setIsOpen(false);
      setFieldValue && setFieldValue(name, '', false);
      handleChange && handleChange('');
      return;
    }
    const selected = getOptionName(option);
    if (!selected) {
      return;
    }
    setIsSelected(selected);
    setIsOpen(false);
    setFieldValue && setFieldValue(name, selected.value, false);
    handleChange && handleChange(selected.value);
  };

  useEffect(() => {
    value ? handleOptionClick(value) : setIsSelected(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div
        className={clsxm(
          'overlay hidden',
          isOpen && 'fixed inset-0 z-10 block'
        )}
        onClick={() => setIsOpen(false)}
      ></div>
      <div className='relative'>
        {label && (
          <p className='pb-2 text-base leading-6 text-black'>{label}</p>
        )}
        <div data-select-name={name} className='relative w-full'>
          <div
            className={clsxm(
              'relative flex h-12 items-center justify-between overflow-hidden whitespace-nowrap rounded-xs border px-5 capitalize',
              isSelected || fakeValue ? 'text-navy' : 'text-gray',
              error ? 'border-error' : 'border-cloud',
              className
            )}
            onClick={() => setIsOpen(true)}
          >
            {isSelected
              ? isSelected.name
              : fakeValue
              ? getOptionName(placeholder?.toLowerCase() || '')?.name
              : placeholder}
            <div className='absolute right-0 flex h-full w-10 items-center justify-center bg-white'>
              <Icon name='chevron' />
            </div>
          </div>
          <div
            className={clsxm(
              'mt-1.5 w-auto min-w-full border border-cloud shadow-md',
              isOpen ? 'absolute z-50' : 'hidden'
            )}
          >
            <div
              className={clsxm(
                'border-t border-cloud text-sm first-of-type:border-t-0 md:text-base',
                'flex h-12 w-full cursor-pointer items-center overflow-hidden whitespace-nowrap bg-white px-5 capitalize',
                'hover:bg-navy hover:text-white'
              )}
              onClick={() => handleOptionClick(null)}
            >
              Wyczyść
            </div>
            {options.map(({ name, value }) => (
              <div
                key={value}
                className={clsxm(
                  'border-t border-cloud text-sm first-of-type:border-t-0 md:text-base',
                  'flex h-12 w-full cursor-pointer items-center overflow-hidden whitespace-nowrap bg-white px-5 capitalize',
                  'hover:bg-navy hover:text-white',
                  isSelected &&
                    isSelected.value === value &&
                    'bg-navy text-white'
                )}
                onClick={() => handleOptionClick(value)}
              >
                {name}
              </div>
            ))}
          </div>
        </div>
        <p className='text-xs text-error'>{error ? error : null}</p>
      </div>
    </>
  );
};
