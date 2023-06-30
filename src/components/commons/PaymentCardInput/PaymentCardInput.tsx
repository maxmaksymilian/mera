import useTranslation from 'next-translate/useTranslation';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { clsxm } from '@/lib';

export type PaymentCardInputProps = {
  name: string;
  value?: string | null;
  label?: string;
  error?: string;
  className?: string;
  setFieldValue: (
    field: string,
    value: string,
    shouldValidate?: boolean
  ) => void;
};

export const PaymentCardInput = ({
  value,
  name,
  label,
  error,
  className,
  setFieldValue,
}: PaymentCardInputProps) => {
  const { t } = useTranslation('form');
  const [values, setValues] = useState({
    first: value ? value.substring(0, 6) : '',
    second: value ? value.substring(6, 10) : '',
  });

  const firstInputRef = useRef<HTMLInputElement>(null);
  const secondInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, name: string) => {
    const value = e.target.value.replace(/\D/g, '');

    if (name === 'first' && value.length >= 6) {
      secondInputRef?.current?.focus();
    }

    setValues({ ...values, [name]: value });
  };

  useEffect(() => {
    const { first, second } = values;
    const combined = first + second;
    setFieldValue(name, combined);
  }, [values.first, values.second]);

  return (
    <>
      <div className='flex flex-col gap-2'>
        {label && <label>{label}</label>}
        <div
          className={clsxm(
            'flex h-12 items-stretch justify-start px-5',
            'focus:border-1 rounded-xs border outline-0 focus:border-navy',
            error
              ? 'border-error focus:border-error'
              : 'border-cloud focus:border-cloud',
            className
          )}
        >
          <input
            ref={firstInputRef}
            type='text'
            name='first'
            placeholder='______'
            className='w-20 border-none'
            maxLength={6}
            value={values.first}
            onChange={(e) => handleChange(e, 'first')}
          />
          <div className='w-24 text-center leading-10'>* * * * * *</div>
          <input
            ref={secondInputRef}
            name='second'
            placeholder='____'
            className='w-24 border-none px-5 focus:outline-none md:w-36'
            maxLength={4}
            value={values.second}
            onChange={(e) => handleChange(e, 'second')}
          />
        </div>
      </div>
      <p className='text-xs text-error'>{error ? t(error) : null}</p>
    </>
  );
};
