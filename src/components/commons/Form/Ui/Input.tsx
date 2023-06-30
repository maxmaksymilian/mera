import useTranslation from 'next-translate/useTranslation';
import { ComponentProps, useState } from 'react';

import { clsxm } from '@/lib/clsxm';

import { Icon } from '@/components/commons/Icon/Icon';

export type InputProps = {
  className?: string;
  error?: string;
} & ComponentProps<'input'>;

const Input = ({
  className,
  error,
  type,
  placeholder,
  ...props
}: InputProps) => {
  const { t } = useTranslation('form');
  const [isPasswordType, setIsPasswordType] = useState(type === 'password');

  return (
    <div className={clsxm(type === 'password' && 'relative')}>
      <input
        {...{
          ...props,
          placeholder: placeholder ? t(`label.${placeholder}`) : '',
          type: isPasswordType ? 'password' : 'text',
        }}
        className={clsxm(
          'focus:border-1 h-12 w-full rounded-xs border px-6 outline-0 focus:border-navy',
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
  );
};

export default Input;
