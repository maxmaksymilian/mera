import { ChangeEvent, FocusEvent, useRef } from 'react';

import { clsxm } from '@/lib';

import { Icon } from '@/components/commons/Icon/Icon';

export type SearchInputProps = {
  name: string;
  placeholder?: string;
  className?: string;
  value?: string;
  handleBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  clearInput: () => void;
};

export const SearchInput = ({
  name,
  placeholder,
  className,
  value,
  handleChange,
  clearInput,
}: SearchInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className='search-input-container h-full'>
      <div
        className={clsxm(
          'flex h-10 items-center rounded-xs border border-cloud px-6',
          className
        )}
      >
        <Icon name='magnifier' />
        <input
          ref={inputRef}
          type='text'
          name={name}
          id={name}
          value={value}
          placeholder={placeholder}
          className='h-full w-full border-none'
          onChange={handleChange}
        />
        <button onClick={clearInput}>
          <Icon
            name='close-modal'
            className={clsxm(
              'w-2.5',
              value ? 'visible cursor-pointer' : 'invisible'
            )}
          />
        </button>
      </div>
    </div>
  );
};
