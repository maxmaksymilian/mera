import useTranslation from 'next-translate/useTranslation';

import { convertDate } from '@/lib/helpers';

import { Icon } from '@/components/commons/Icon/Icon';

export type SummaryTicketCardProps = {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  created_at: string;
  order: {
    id: string;
    created_at: string;
    order_number: string;
  };
};

export const SummaryTicketCard = ({
  name,
  start_date,
  end_date,
  created_at,
  order,
}: SummaryTicketCardProps) => {
  const { t } = useTranslation('common');

  return (
    <div className='mt-7 flex flex-col md:flex-row md:items-center md:justify-between md:gap-5'>
      <div className='flex flex-col md:flex-row'>
        <button className='mr-6 hidden md:block'>
          <Icon name='ticket' />
        </button>
        <div className='flex flex-col gap-2 pt-0 md:flex-row md:gap-0 md:pt-4'>
          <div>
            <p className='pb-2 text-sm font-normal md:pb-0 md:text-base md:font-bold'>
              {name}
            </p>
            <div className='flex flex-col md:flex-row'>
              <p className='mr-4 text-sm text-navy'>#{order.order_number}</p>
              <p className='whitespace-nowrap text-sm'>
                {convertDate(created_at, true)}
              </p>
            </div>
          </div>
          <div className='ml-0 flex-col md:ml-32 md:flex-row'>
            <p className='text-sm text-gray md:text-base'>
              {t('activationDate')}:
            </p>
            <p className='whitespace-nowrap text-sm md:text-base'>
              {convertDate(start_date, true)}
            </p>
          </div>
          <div className='ml-0 flex-col md:ml-16 md:flex-row'>
            <p className='text-sm text-gray md:text-base'>{t('expDate')}:</p>
            <p className='whitespace-nowrap text-sm text-success md:text-base'>
              {convertDate(end_date, true)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
