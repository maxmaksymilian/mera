import useTranslation from 'next-translate/useTranslation';
import { ComponentProps } from 'react';

import { clsxm } from '@/lib';

import { Icon } from '@/components/commons/Icon/Icon';
import { statusOptions } from '@/components/commons/Status';

import { useSelect } from './useSelect';

export type SelectProps = {
  name: string;
  id?: string;
  clearLabel?: 'clear' | 'empty';
  fakeValue?: boolean;
  options?: { name: string; value: string }[];
  className?: string;
  error?: string;
  isClear?: boolean;
  dynamic?: boolean;
  onChange: (value: string | number | null) => void;
} & Omit<ComponentProps<'select'>, 'onChange'>;

export type ValueType = string | number | readonly string[] | undefined;

const Select = ({ error, ...props }: SelectProps) => {
  const { t } = useTranslation('form');
  const {
    fakeValue,
    className,
    placeholder,
    options,
    isClear,
    name,
    dynamic,
    clearLabel = 'clear',
  } = props;
  const {
    ref,
    value,
    isOpen,
    valueName,
    setIsOpen,
    getOptionName,
    handleOptionClick,
  } = useSelect({ ...props });

  return (
    <div ref={ref} data-select-name={valueName} className='relative w-full'>
      <button
        type='button'
        className={clsxm(
          'relative flex h-12 w-full items-center justify-between overflow-hidden whitespace-nowrap rounded-xs border px-5 capitalize',
          name === 'status' && 'justify-start',
          value || fakeValue ? 'text-navy' : 'text-gray',
          error ? 'border-error' : 'border-cloud',
          className
        )}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {name === 'status' && value ? (
          <span
            className={clsxm(
              'mr-2 block h-2.5 w-2.5 rounded-full bg-black',
              `bg-${statusOptions[value.toString()]}`
            )}
          />
        ) : (
          ''
        )}
        {value
          ? dynamic
            ? valueName
            : t(`options.${name}.${valueName}`)
          : fakeValue
          ? getOptionName(t(`label.${placeholder}`)?.toLowerCase() || '')
          : t(`label.${placeholder}`)?.toLowerCase()}
        <div className='absolute right-0 flex h-full w-10 items-center justify-center bg-white'>
          <Icon name='chevron' />
        </div>
      </button>
      <div
        className={clsxm(
          'mt-1.5 max-h-56 w-auto min-w-full overflow-y-auto border border-cloud bg-white shadow-md',
          isOpen ? 'absolute z-50' : 'hidden'
        )}
      >
        {isClear ? (
          <div
            className={clsxm(
              'border-t border-cloud text-sm first-of-type:border-t-0 md:text-base',
              'flex h-12 w-full cursor-pointer items-center overflow-hidden whitespace-nowrap bg-white px-5 capitalize',
              'hover:bg-navy hover:text-white'
            )}
            onClick={() => handleOptionClick('')}
          >
            {t(`options.${clearLabel}`)}
          </div>
        ) : null}
        {options
          ? options.map(({ name: optionName, value: optionValue }) => {
              return (
                <div
                  key={optionValue}
                  className={clsxm(
                    'border-t border-cloud text-sm first-of-type:border-t-0 md:text-base',
                    'flex h-12 w-full cursor-pointer items-center overflow-hidden whitespace-nowrap bg-white px-5 capitalize',
                    'hover:bg-navy hover:text-white',
                    value && value === optionValue && 'bg-navy text-white'
                  )}
                  onClick={() => handleOptionClick(optionValue)}
                >
                  {name === 'status' ? (
                    <span
                      className={clsxm(
                        'mr-2 block h-2.5 w-2.5 rounded-full bg-black',
                        `bg-${statusOptions[optionName]}`
                      )}
                    />
                  ) : (
                    ''
                  )}{' '}
                  {dynamic ? optionName : t(`options.${name}.${optionName}`)}
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Select;
