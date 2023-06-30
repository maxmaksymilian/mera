import { useEffect, useMemo } from 'react';
import { scroller } from 'react-scroll';

import { range } from '@/lib/helpers';
import { useRouterParams } from '@/hooks/useRouterParams';
import { useScreen } from '@/hooks/useScreen';

type UsePaginationProps = {
  pageSize: number;
  totalCount: number;
  siblingCount?: number;
};

const DOTS = '...';

export const usePagination = ({
  pageSize,
  siblingCount = 3,
  totalCount,
}: UsePaginationProps) => {
  const { isDesktop } = useScreen();
  const { setParam, getParamValue } = useRouterParams();
  const currentPage = Number(getParamValue('page')) || 1;

  isDesktop ? siblingCount : (siblingCount = 1);

  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);
    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalCount, pageSize, siblingCount, currentPage]);

  const handleScroll = () => {
    scroller.scrollTo('section-table', {
      duration: 300,
      delay: 50,
      smooth: true,
      offset: -200,
    });
  };

  const handleChangePage = (page: number) => {
    setParam('page', page);
    handleScroll();
  };

  useEffect(() => {
    if (
      currentPage &&
      paginationRange &&
      currentPage > Number(paginationRange[paginationRange.length - 1])
    ) {
      setParam('page', Number(paginationRange[paginationRange.length - 1]));
      handleScroll();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize]);

  const isVisible = paginationRange && paginationRange?.length > 0;

  return { isVisible, paginationRange, currentPage, handleChangePage };
};
