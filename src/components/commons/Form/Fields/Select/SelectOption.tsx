import { clsxm } from '@/lib';

type SelectOptionProps = {
  value: string;
  handleSelectOptionClick: () => void;
};

export const SelectOption = ({
  value,
  handleSelectOptionClick,
}: SelectOptionProps) => (
  <div
    className={clsxm(
      'border-t border-cloud text-sm first-of-type:border-t-0 md:text-base',
      'flex h-12 w-full cursor-pointer items-center overflow-hidden whitespace-nowrap bg-white px-5 capitalize',
      'hover:bg-navy hover:text-white'
    )}
    onClick={handleSelectOptionClick}
  >
    {value}
  </div>
);
