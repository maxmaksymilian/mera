import { PaginationButton } from './components/PaginationButton';
import { usePagination } from './usePagination';

export type PaginationProps = {
  current: number;
  last: number;
  total: number;
  tableId: string;
  pageSize: string;
};

export const Pagination = ({
  current,
  total,
  last,
  pageSize,
}: PaginationProps) => {
  const { isVisible, paginationRange, handleChangePage } = usePagination({
    pageSize: Number(pageSize) || 25,
    totalCount: total,
  });

  return (
    <div className='pagination mx-auto flex w-auto max-w-lg justify-center gap-2.5 py-5'>
      {isVisible && current > 1 && (
        <PaginationButton
          isPrevBtn
          handleClick={() => handleChangePage(current - 1)}
        />
      )}
      {paginationRange && paginationRange?.length > 1
        ? paginationRange?.map((pageNumber, index) => (
            <PaginationButton
              key={index}
              {...{
                pageNumber: pageNumber,
                isDisabled: pageNumber === '...',
                isActive: pageNumber === current,
                handleClick: () => {
                  typeof pageNumber === 'number'
                    ? handleChangePage(pageNumber)
                    : null;
                },
              }}
            />
          ))
        : null}
      {isVisible && current !== last && (
        <PaginationButton
          isNextBtn
          handleClick={() => handleChangePage(current + 1)}
        />
      )}
    </div>
  );
};
