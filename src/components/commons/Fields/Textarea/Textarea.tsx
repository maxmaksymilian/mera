import { ChangeEvent, FocusEvent } from 'react';

import { clsxm } from '@/lib';

export type TextareaProps = {
  name: string;
  label?: string;
  placeholder?: string;
  value?: string;
  error?: string;
  className?: string;
  handleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  handleBlur: (e: FocusEvent<HTMLTextAreaElement>) => void;
};

export const Textarea = ({
  name,
  error,
  placeholder,
  value,
  className,
  label,
  handleBlur,
  handleChange,
}: TextareaProps) => (
  <>
    <div className='flex flex-col gap-2'>
      {label && <label>{label}</label>}
      <textarea
        rows={8}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={(e) => handleChange(e)}
        onBlur={(e) => handleBlur(e)}
        className={clsxm(
          'focus:border-1 resize-none rounded-xs border outline-0 focus:border-navy',
          error
            ? 'border-error focus:border-error'
            : 'border-cloud focus:border-cloud',
          className
        )}
      />
    </div>
    <p className='text-xs text-error'>{error ? error : null}</p>
  </>
);
