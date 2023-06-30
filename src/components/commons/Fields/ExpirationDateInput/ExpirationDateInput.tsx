import { clsxm } from '@/lib';

import { useExpirationDateInput } from './useExpirationDateInput';

export type ExpirationDateInputProps = {
  name: string;
  value: string;
  label?: string;
  error?: string;
  placeholder?: string;
  className?: string;
  setFieldValue: (
    field: string,
    value: string,
    shouldValidate?: boolean
  ) => void;
};

export const ExpirationDateInput = ({
  label,
  name,
  error,
  value,
  className,
  placeholder,
  setFieldValue,
}: ExpirationDateInputProps) => {
  const { t, handleExpirationDateChange } = useExpirationDateInput({
    name,
    setFieldValue,
  });
  return (
    <>
      <div className='flex flex-col gap-2'>
        {label && <label>{label}</label>}
        <div>
          <input
            type='text'
            name={name}
            value={value ? value : ''}
            placeholder={placeholder}
            maxLength={5}
            onChange={handleExpirationDateChange}
            className={clsxm(
              'focus:border-1 h-12 w-auto rounded-xs border px-6 outline-0 focus:border-navy',
              error
                ? 'border-error focus:border-error'
                : 'border-cloud focus:border-cloud',
              className
            )}
          />
        </div>
      </div>
      <p className='text-xs text-error'>{error ? t(error) : null}</p>
    </>
  );
};
