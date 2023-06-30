import { convertDate } from '@/lib/helpers';

import { useHistoryCard } from './useHistoryCard';

export type HistoryCardProps = {
  id: string;
  name: string;
  event: string;
  created_at: string;
  changes: {
    attributes?: { [key: string]: string };
    old?: { [key: string]: string };
  };
};

export const HistoryCard = ({
  name,
  event,
  created_at,
  changes,
}: HistoryCardProps) => {
  const { t, transformedChanges } = useHistoryCard({ changes });

  return (
    <div className='flex w-full gap-7 pb-6 md:w-3/4 lg:w-2/5'>
      <div className='phase relative'>
        <span className='absolute left-2.5 -z-10 h-full w-0.5 -translate-x-1/2 bg-cloud'></span>
        <span className='box-content block h-5 w-5 rounded-full bg-success'></span>
      </div>
      <div className='phase-content w-[calc(100%_-_50px)]'>
        <div className='flex flex-col justify-between pb-2.5 md:flex-row md:items-center md:pb-7'>
          <p className='text-base font-bold leading-6 text-black'>
            {t(`history:message.${name}.${event}`)}
          </p>
          <p className='text-sm leading-6 text-gray'>
            {convertDate(created_at, true)}
          </p>
        </div>
        <div className='flex flex-col gap-4 md:gap-1'>
          {transformedChanges.map(({ name: valueName, value, oldValue }) => (
            <div
              key={name}
              className='flex flex-col md:flex-row md:items-center md:justify-between md:gap-4'
            >
              <p className='text-base leading-6'>
                <span>{t(`history:label.${name}.${valueName}`)}: </span> &nbsp;
              </p>
              <div className='flex flex-wrap gap-2.5 md:justify-end'>
                {oldValue ? (
                  <>
                    <p className='text-base leading-6 text-gray'>
                      <span className='line-through'>{oldValue}</span> &nbsp;
                    </p>
                    <p className='whitespace-nowrap text-base leading-6  text-gray'>
                      {'->'}
                    </p>
                  </>
                ) : null}
                <p className='text-right text-base leading-6'>{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
