import useTranslation from 'next-translate/useTranslation';

import { convertDate } from '@/lib/helpers';

import { Icon } from '@/components/commons/Icon/Icon';
import { Status } from '@/components/commons/Status';
import { ITicket } from '@/components/panel/MyCards/CardDetails/ActiveTicketsSection/ActiveTicketsSection';

export type ActiveTicketRowProps = {
  ticket: ITicket;
  user: any;
};

export const ActiveTicketRow = ({
  ticket: { created_at, end_date, name, start_date, status },
  user: { profile },
}: ActiveTicketRowProps) => {
  const { t } = useTranslation('common');
  return (
    <div className='flex items-center border-b border-cloud py-7 md:gap-6 md:border-none md:py-0 md:pb-5'>
      <div className='flex flex-1 flex-col justify-between md:flex-row md:items-center'>
        <div className='gap-3 md:flex md:flex-row'>
          <div className='hidden md:block'>
            <Icon name='ticket' />
          </div>
          <div>
            <p className='pb-4 text-base font-normal leading-6 text-black md:pb-0 md:font-bold'>
              {name}
            </p>
            <div className='flex pb-3 md:hidden'>
              <p className='w-1/2 text-sm font-normal leading-5 text-gray md:text-base'>
                {t('dataCarrier')}
              </p>
              <p className='w-1/2 text-sm font-normal leading-5 md:text-base'>
                {name}
              </p>
            </div>
            <div className='flex pb-3 md:hidden'>
              <p className='w-1/2 text-sm font-normal leading-5 text-gray md:text-base'>
                {t('user')}
              </p>
              <p className='w-1/2 text-sm font-normal leading-5 md:text-base'>
                {profile?.first_name} {profile?.last_name}
              </p>
            </div>
            <div className='hidden gap-2.5 md:flex'>
              <p className='text-sm font-normal leading-5 text-navy md:text-base'>
                numer
              </p>
              <p className='text-sm font-normal leading-5 md:text-base'>
                {created_at}
              </p>
            </div>
          </div>
        </div>
        <div className='flex flex-col md:flex-row md:items-center md:gap-12'>
          <div className='flex pb-3 md:flex-col md:pb-0'>
            <p className='w-1/2 text-sm leading-6 text-gray md:w-auto md:text-base'>
              {t('activationDate')}:
            </p>
            <h2 className='w-1/2 text-sm font-normal leading-6 text-black md:w-auto md:text-base'>
              {convertDate(start_date)}
            </h2>
          </div>
          <div className='flex pb-3 md:flex-col md:pb-0'>
            <p className='w-1/2 text-sm leading-6 text-gray md:w-auto md:text-base'>
              {t('expDate')}:
            </p>
            <h2 className='w-1/2 text-sm font-normal leading-6 md:w-auto md:text-base md:text-success'>
              {convertDate(end_date)}
            </h2>
          </div>
        </div>
        <div className='flex md:hidden'>
          <p className='w-1/2 text-sm font-normal leading-5 text-gray md:text-base'>
            {t('status')}
          </p>
          <Status value={status} className='text-sm' />
        </div>
      </div>
    </div>
  );
};
