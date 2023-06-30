import { clsxm } from '@/lib';

import { Icon } from '@/components/commons/Icon/Icon';
import { Skeleton } from '@/components/commons/Skeleton/Skeleton';

import { useSearchUserDropdown } from './useSearchUserDropdown';

export type SearchUserDropdownProps = {
  name: string;
  label?: string;
  error?: string;
  className?: string;
  isClear?: boolean;
  clearLabel?: 'clear' | 'empty';
  handleChange?: (data: Customer | null) => void;
};

export type Customer = {
  id: string;
  profile: {
    first_name: string;
    last_name: string;
  };
  parent: {
    id: string;
    profile: {
      first_name: string;
      last_name: string;
    };
  };
  type?: 'main' | 'child';
};

const SearchUserDropdown = ({
  name,
  label,
  error,
  className,
  isClear,
  clearLabel = 'clear',
  handleChange,
}: SearchUserDropdownProps) => {
  const {
    customers,
    isOpen,
    selected,
    status,
    handleOptionClick,
    handleSearch,
    setIsOpen,
    t,
  } = useSearchUserDropdown({ name, handleChange });

  return status === 'success' ? (
    <>
      <div
        className={clsxm(
          'overlay hidden',
          isOpen && 'fixed inset-0 z-10 block'
        )}
        onClick={() => setIsOpen(false)}
      ></div>
      <div className='relative'>
        {label && (
          <p className='pb-2 text-base leading-6 text-black'>{label}</p>
        )}
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
              name='searchUserDropdown'
              type='text'
              value={selected ? selected : ''}
              placeholder={t('label.searchCustomerDropdown')}
              onChange={handleSearch}
              className='block w-full border-none px-5 outline-none'
            />
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
              <div
                className={clsxm(
                  'border-t border-cloud text-sm first-of-type:border-t-0 md:text-base',
                  'flex h-12 w-full cursor-pointer items-center overflow-hidden whitespace-nowrap bg-white px-5 capitalize',
                  'hover:bg-navy hover:text-white'
                )}
                onClick={() => handleOptionClick(null)}
              >
                {t(`options.${clearLabel}`)}
              </div>
            ) : null}
            {customers?.map((customer: Customer) => (
              <div
                key={customer.id}
                className={clsxm(
                  'border-t border-cloud text-sm first-of-type:border-t-0 md:text-base',
                  'flex h-12 w-full cursor-pointer items-center overflow-hidden whitespace-nowrap bg-white px-5 capitalize',
                  'hover:bg-navy hover:text-white'
                )}
                onClick={() => handleOptionClick(customer)}
              >
                {customer.profile.first_name + ' ' + customer.profile.last_name}
              </div>
            ))}
          </div>
        </div>
        <p className='text-xs text-error'>{error ? error : null}</p>
      </div>
    </>
  ) : (
    <Skeleton count={1} />
  );
};

export default SearchUserDropdown;
