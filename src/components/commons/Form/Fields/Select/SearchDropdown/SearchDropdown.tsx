import { useEffect, useState } from 'react';

import { clsxm } from '@/lib';
import { ApiKeysType } from '@/hooks/api/apiEndpoints';
import { useApiQuery } from '@/hooks/api/useApiQuery';

import { SelectOption } from '@/components/commons/Form/Fields/Select/SelectOption';
import { FormField, useFormField } from '@/components/commons/Form/FormField';
import { Icon } from '@/components/commons/Icon/Icon';
import { Skeleton } from '@/components/commons/Skeleton/Skeleton';

import { useSearchDropdown } from './useSearchDropdown';

type SearchDropdownProps = {
  name: string;
  route: ApiKeysType;
  isFullName?: boolean;
  customFilterQuery?: string;
  label?: string;
  placeholder?: string;
  className?: string;
  isClear?: boolean;
  clearLabel?: 'clear' | 'empty';
  userId?: string;
  isCustomerService?: boolean;
};

const SearchDropdown = ({
  name,
  route,
  className,
  clearLabel = 'clear',
  isClear,
  label,
  placeholder,
  userId,
  isFullName,
  customFilterQuery,
}: SearchDropdownProps) => {
  const [respData, setRespData] = useState(null);
  const { formFieldProps } = useFormField({ placeholder, label, name });
  const {
    error,
    search,
    isOpen,
    selected,
    handleClickOutside,
    handleOptionClick,
    handleSearch,
    setIsOpen,
    t,
  } = useSearchDropdown({ data: respData, name, isFullName });

  const { data, status, refetch } = useApiQuery({
    route,
    values: userId
      ? { user: userId }
      : { [customFilterQuery ? customFilterQuery : name]: search },
    params: userId
      ? {
          user: userId,
        }
      : undefined,
  });

  useEffect(() => {
    setRespData(data);
  }, [data]);

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, selected]);

  return status === 'success' ? (
    <>
      <div
        className={clsxm(
          'overlay hidden',
          isOpen && 'fixed inset-0 z-10 block'
        )}
        onClick={handleClickOutside}
      />
      <FormField {...{ ...formFieldProps, className: 'relative' }}>
        <div data-select-name={name} className='relative w-full'>
          <div
            className={clsxm(
              'relative flex h-12 items-center justify-between overflow-hidden whitespace-nowrap rounded-xs border capitalize',
              selected ? 'text-navy' : 'text-gray',
              error ? 'border-error' : 'border-cloud',
              className
            )}
            onClick={() => setIsOpen(true)}
          >
            <input
              type='text'
              name={name}
              value={selected ? selected : ''}
              placeholder={t(`label.${placeholder ? placeholder : label}`)}
              className='block w-full border-none px-9 text-base outline-none'
              onChange={handleSearch}
            />
            <div className='absolute left-1.5 flex h-10 w-7 cursor-pointer items-center justify-center bg-white'>
              <Icon name='magnifier' />
            </div>
            <div className='absolute right-0 flex h-10 w-10 cursor-pointer items-center justify-center bg-white'>
              <Icon name='chevron' />
            </div>
          </div>
          <div
            className={clsxm(
              'mt-0.5 max-h-96 w-auto min-w-full overflow-y-auto border border-cloud shadow-md',
              isOpen ? 'absolute z-50' : 'hidden'
            )}
          >
            {isClear ? (
              <SelectOption
                value={t(`options.${clearLabel}`)}
                handleSelectOptionClick={() => handleOptionClick(null)}
              />
            ) : null}
            {data?.map((item: any) => (
              <SelectOption
                key={item.id}
                value={
                  item?.profile
                    ? item?.profile?.first_name + ' ' + item?.profile?.last_name
                    : item.order_number
                }
                handleSelectOptionClick={() => handleOptionClick(item)}
              />
            ))}
          </div>
        </div>
      </FormField>
    </>
  ) : (
    <Skeleton count={1} />
  );
};
export default SearchDropdown;
