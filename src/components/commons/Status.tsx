import useTranslation from 'next-translate/useTranslation';

import { clsxm } from '@/lib';

export const statusOptions: { [key: string]: 'gray' | 'error' | 'success' } = {
  active: 'success',
  not_active: 'error',
  new: 'success',
  payed: 'success',
  completed: 'success',
  canceled: 'error',
  in_progress: 'gray',
  closed: 'error',
  failed: 'error',
  brak: 'gray',
};

export const Status = ({
  value,
  className,
}: {
  value: string;
  className?: string;
}) => {
  const { t } = useTranslation('form');

  return (
    <div {...{ className }}>
      <span
        className={clsxm(
          `mr-1.5 inline-block h-3 w-3 rounded-full`,
          `bg-${statusOptions[value]}`
        )}
      />

      {t(`options.status.${value}`)}
    </div>
  );
};
