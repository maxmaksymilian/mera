import { SkeletonProps } from 'react-loading-skeleton';

import { useScreen } from '@/hooks/useScreen';

import { Skeleton } from '@/components/commons/Skeleton/Skeleton';

export const CardsSkeleton = ({ count = 3 }: Pick<SkeletonProps, 'count'>) => {
  const { isMdUp } = useScreen();

  return (
    <div className='w-full'>
      <Skeleton
        {...{
          count,
          height: 400,
          width: isMdUp ? 'calc(33% - 1rem)' : '100%',
          inline: true,
          className: 'my-2 md:m-2',
        }}
      />
    </div>
  );
};
