import { clsxm } from '@/lib';

export const Spinner = ({ className }: { className?: string }) => {
  return (
    <div
      className={clsxm(
        'mx-auto h-10 w-10 animate-spin rounded-[100%] border-4 border-solid border-white border-t-transparent',
        className
      )}
    />
  );
};
