import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import Skeleton from 'react-loading-skeleton';

import { clsxm } from '@/lib/clsxm';

import { Button } from '@/components/commons/Button';
import {
  SummaryTicketCard,
  SummaryTicketCardProps,
} from '@/components/commons/Cards/SummaryTicketCard';
import { ProgressBar } from '@/components/commons/Form/ProgressBar/ProgressBar';
import { steps } from '@/components/Forms/Tickets/Order/OrderFormModel';
import { stepsPok } from '@/components/Forms/Tickets/Order/OrderFormModel';
import { useSummary } from '@/components/panel/Tickets/Order/Summary/useSummary';

export type SummaryProps = {
  orderId: string;
  access: 'admin' | 'client';
  id?: string;
};

export const Summary = ({ access, ...props }: SummaryProps) => {
  const { t } = useTranslation('common');
  const { data, status, isSuccess, isLoading, getFile } = useSummary({
    access,
    ...props,
  });

  return (
    <div>
      <ProgressBar
        {...{
          steps: access === 'admin' ? stepsPok : steps,
          startIndex: 0,
          step: access === 'admin' ? 3 : 2,
          className: clsxm(
            'md:max-w-[600px] mx-auto md:mb-8',
            access === 'admin' && 'md:max-w-[800px]'
          ),
        }}
      />
      <div>
        <p className='text-base font-bold md:mt-[90px] md:text-4xl md:font-normal'>
          {isSuccess
            ? t('thanksYourTickets')
            : t('thanksYourTicketsInProgress')}
        </p>
        <p className='mt-4 text-sm text-gray md:text-base'>
          {isSuccess
            ? t('confirmationMailSent')
            : t('confirmationMailSentInProgress')}
          <em className='text-navy'> ({data?.user?.profile?.email})</em>
        </p>
        <div>
          {isSuccess && (
            <>
              <Button
                handleClick={() => getFile({})}
                variant='primary'
                className='mt-4 hidden text-sm md:block'
              >
                {t('saveConfirmationPDF')}
              </Button>

              <Button
                handleClick={() => getFile({})}
                fullWidth
                variant='primary'
                className='mt-4 block text-sm md:hidden'
              >
                {t('saveConfirmationPDF')}
              </Button>
            </>
          )}
        </div>
        <p className='mt-10 mb-3 font-bold'>
          {data?.user?.profile?.first_name} {data?.user?.profile?.last_name}
        </p>
        {status === 'success' && !isLoading ? (
          data?.tickets &&
          data.tickets.map((ticket: SummaryTicketCardProps) => (
            <SummaryTicketCard key={ticket.id} {...ticket} />
          ))
        ) : (
          <Skeleton {...{ count: 3, height: 90 }} />
        )}
        {access === 'client' ? (
          <div className='mt-14 mb-4 md:w-fit'>
            <Button fullWidth>
              <Link href='/panel/moje-bilety/'>{t('buttonMyTickets')}</Link>
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};
