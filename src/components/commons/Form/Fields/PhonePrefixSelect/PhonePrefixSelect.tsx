import { ComponentProps } from 'react';

import { clsxm } from '@/lib';
import { Without } from '@/lib/api';

import { FormField, useFormField } from '@/components/commons/Form/FormField';
import { Icon } from '@/components/commons/Icon/Icon';

import { PhonePrefixOption, PhonePrefixOptionType } from './PhonePrefixOption';
import { usePhonePrefixSelect } from './usePhonePrefixSelect';

export type PhonePrefixSelectProps = {
  name: string;
  label?: string;
  fakeValue?: boolean;
  options?: Without<PhonePrefixOptionType, 'handleClick'>[];
  className?: string;
  isClear?: boolean;
} & ComponentProps<'select'>;

export type ValueType = string | number | readonly string[] | undefined;

export const PhonePrefixSelect = ({ ...props }: PhonePrefixSelectProps) => {
  const { fakeValue, className, options, isClear } = props;
  const { formFieldProps } = useFormField(props);
  const { ref, value, error, isOpen, setIsOpen, valueName, handleOptionClick } =
    usePhonePrefixSelect({ ...props });

  return (
    <FormField {...{ ...formFieldProps, className: 'relative' }}>
      <div ref={ref} data-select-name={valueName} className='relative w-full'>
        <div
          className={clsxm(
            'relative flex h-12 items-center justify-between overflow-hidden whitespace-nowrap rounded-xs border px-5 capitalize',
            value || fakeValue ? 'text-navy' : 'text-gray',
            error ? 'border-error' : 'border-cloud',
            className
          )}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <div>
            <span>{value}</span>
            <span className='pl-2.5'>{valueName}</span>
          </div>
          <div className='absolute right-0 flex h-full w-10 items-center justify-center bg-white'>
            <Icon name='chevron' />
          </div>
        </div>
        <div
          className={clsxm(
            'mt-1.5 h-56 w-auto min-w-full overflow-y-auto border border-cloud bg-white shadow-md',
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
              onClick={() => handleOptionClick(null)}
            >
              Wyczyść
            </div>
          ) : null}
          {options
            ? options.map((item) => (
                <PhonePrefixOption
                  key={item.code}
                  handleClick={() => handleOptionClick(item.value)}
                  {...item}
                />
              ))
            : null}
        </div>
      </div>
    </FormField>
  );
};
