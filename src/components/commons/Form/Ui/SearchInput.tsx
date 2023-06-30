import useTranslation from 'next-translate/useTranslation';
import { ComponentProps, useRef } from 'react';

import { clsxm } from '@/lib';

import { Icon } from '@/components/commons/Icon/Icon';

export type SearchInputProps = {
  className?: string;
  clearField: () => void;
} & ComponentProps<'input'>;

const SearchInput = ({
  className,
  clearField,
  placeholder,
  value,
  ...props
}: SearchInputProps) => {
  const { t } = useTranslation('form');
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className='search-input-container h-full'>
      <div
        className={clsxm(
          'flex h-full items-center rounded-xs border border-cloud px-6',
          className
        )}
      >
        <Icon name='magnifier' />
        <input
          {...{
            ...props,
            ref: inputRef,
            value,
            placeholder: placeholder ? t(`label.${placeholder}`) : '',
            className: 'h-full w-full border-none',
            type: 'text',
          }}
        />
        <button type='button' onClick={clearField}>
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

export default SearchInput;
