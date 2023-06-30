import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import SantaImage from 'public/images/homepage/santa.png';

import { convertDate } from '@/lib/helpers';
import { useTicketsStore } from '@/lib/state/useTicketsStore';
import { useApiQuery } from '@/hooks/api/useApiQuery';
import { useScreen } from '@/hooks/useScreen';

import { Button } from '@/components/commons/Button';
import { Container } from '@/components/commons/Container';
import { Link } from '@/components/commons/Link';
import { TicketBar } from '@/components/events/components/TicketBar/TicketBar';

export const TicketPurchaseConfirmation = () => {
  const { t } = useTranslation('events');
  const { isMdUp } = useScreen();
  const { data } = useApiQuery({ route: 'PROFILE_MY_DATA' });

  const { boughtTickets, event } = useTicketsStore();

  return (
    <Container className='px-5 pt-28 pb-20 sm:px-5 md:pt-40'>
      <div className='lg:flex lg:items-center lg:justify-between'>
        <div>
          <h1 className='text-md font-normal leading-8 md:text-lg md:leading-lg'>
            {t('events.ticketPurchaseConfirmation.headline')}
          </h1>
          <p className='py-10 text-sm font-normal leading-6 text-gray md:py-2.5 md:text-base md:leading-6'>
            {t('events.ticketPurchaseConfirmation.subHeadline')}&nbsp;
            {data?.profile?.email && `(${data.profile.email})`}
          </p>
        </div>
        {isMdUp ? (
          <Button variant='download' className='hidden h-12 lg:block'>
            {t('events.ticketPurchaseConfirmation.downloadBtnLabel')}
          </Button>
        ) : null}
      </div>
      {boughtTickets && (
        <div className='md:flex md:flex-col md:items-start md:gap-10 md:py-10 lg:flex-row lg:items-start'>
          <Image src={SantaImage} alt='' className='min-w-full' />
          <div className='py-10 md:w-full md:py-0'>
            <div className='hidden max-w-[120px] gap-2.5 rounded-full bg-navy px-2.5 md:block'>
              <p className='w-auto text-center text-sm leading-8 text-white'>
                {convertDate(event?.date ? event.date : '')}
              </p>
            </div>
            <p className='pb-6 text-base leading-6 text-black md:pt-2.5 md:text-md md:leading-8'>
              {event?.name}
            </p>
            <div>
              <div className='flex items-center gap-2.5 md:hidden'>
                <p className='w-1/2 text-sm leading-8 text-gray'>
                  {t('events.ticketPurchaseConfirmation.dateLabel')}
                </p>
                <p className='w-1/2 text-sm leading-8 text-black'>
                  {event?.date}
                </p>
              </div>
              {isMdUp ? (
                <div>
                  {boughtTickets.map((item, index) => {
                    return item.amount ? (
                      <TicketBar key={index} {...item} />
                    ) : null;
                  })}
                </div>
              ) : (
                <div>
                  {boughtTickets.map((item, index) => {
                    return item.amount ? (
                      <div key={index} className='flex items-center gap-2.5'>
                        <p className='w-1/2 text-sm leading-8 text-gray'>
                          {item.name}
                        </p>
                        <p className='w-1/2 text-sm leading-8 text-black'>
                          {item.amount} x {item.price} zł
                        </p>
                      </div>
                    ) : null;
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <div className='flex w-full flex-col gap-5 md:items-center md:pt-10'>
        <Button
          variant='secondary'
          className='h-12 w-full max-w-xs text-sm md:hidden'
        >
          {t('events.ticketPurchaseConfirmation.printPDFBtn')}
        </Button>
        <Link href='/panel/wydarzenia'>
          <Button className='h-12 w-full max-w-xs text-sm'>
            {t('events.ticketPurchaseConfirmation.panelLinkLabel')}
          </Button>
        </Link>
      </div>
    </Container>
  );
};
