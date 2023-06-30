import { clsxm } from '@/lib';

import { Icon } from '@/components/commons/Icon/Icon';

type PaginationButtonProps = {
  pageNumber?: number | string;
  isNextBtn?: boolean;
  isPrevBtn?: boolean;
  isActive?: boolean;
  isDisabled?: boolean;
  handleClick: () => void;
};

export const PaginationButton = ({
  isActive,
  isNextBtn,
  isPrevBtn,
  pageNumber,
  isDisabled,
  handleClick,
}: PaginationButtonProps) => (
  <div
    className={clsxm(
      'pagination-page flex h-10 w-10 cursor-pointer items-center justify-center rounded-sm text-center text-md text-gray',
      isActive && 'bg-navy text-white',
      isDisabled && 'cursor-default'
    )}
    onClick={handleClick}
  >
    {!isNextBtn && !isPrevBtn ? (
      pageNumber
    ) : (
      <Icon
        name='chevron'
        className={clsxm('rotate-90', isNextBtn && '-rotate-90')}
      />
    )}
  </div>
);
