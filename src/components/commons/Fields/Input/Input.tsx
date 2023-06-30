import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import { clsxm } from '@/lib';

import { Icon } from '@/components/commons/Icon/Icon';

type InputProps = {
  name: string;
  type: 'text' | 'email' | 'password' | 'current-password' | 'checkbox';
  value: string | number | null;
  label?: string;
  error?: string;
  touched?: boolean;
  className?: string;
  placeholder?: string;
  isCheckbox?: boolean;
  isDisabled?: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

export const Input = ({
  label,
  name,
  type,
  error,
  value,
  className,
  placeholder,
  isCheckbox,
  isDisabled,
  handleChange,
}: InputProps) => {
  const { t } = useTranslation('common');
  const [isPasswordType, setIsPasswordType] = useState(true);

  return (
    <>
      <div className='flex flex-col gap-2'>
        {label && <label>{label}</label>}
        <div className={clsxm(type === 'password' && 'relative')}>
          <input
            name={name}
            type={
              type === 'password'
                ? isPasswordType
                  ? 'password'
                  : 'text'
                : type
            }
            value={value ? value : ''}
            placeholder={placeholder}
            disabled={isDisabled}
            onChange={(e) => handleChange(e)}
            className={clsxm(
              'focus:border-1 rounded-xs border outline-0 focus:border-navy',
              isCheckbox ? 'h-8 w-0 px-4' : 'h-12 w-full px-6',
              error
                ? 'border-error focus:border-error'
                : 'border-cloud focus:border-cloud',
              className
            )}
          />
          {type === 'password' && (
            <button
              tabIndex={-1}
              type='button'
              onClick={() => setIsPasswordType((prevState) => !prevState)}
              className={clsxm(
                isPasswordType
                  ? 'after:absolute after:right-2 after:top-1/2 after:h-px after:w-8 after:-translate-y-1/2 after:-rotate-45 after:bg-black'
                  : ''
              )}
            >
              <Icon
                name='eye'
                className='absolute right-3 top-1/2 -translate-y-1/2'
              />
            </button>
          )}
        </div>
      </div>
      <p className='text-xs text-error'>{error ? t(error) : null}</p>
    </>
  );
};
