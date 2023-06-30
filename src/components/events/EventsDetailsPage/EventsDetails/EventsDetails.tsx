import useTranslation from 'next-translate/useTranslation';

import { useEventsCart } from '@/hooks/useEventsCart';
import { useScreen } from '@/hooks/useScreen';

import { Spinner } from '@/components/commons/Spinner';
import { LoginCard } from '@/components/events/components/LoginCard/LoginCard';
import { BuyTicketSection } from '@/components/events/EventsDetailsPage/BuyTicketSection/BuyTicketSection';
import { EventDetailsDesc } from '@/components/events/EventsDetailsPage/EventDetailsDesc/EventDetailsDesc';
import { EventDetailsInfo } from '@/components/events/EventsDetailsPage/EventDetailsInfo/EventDetailsInfo';
import { PayNowAside } from '@/components/events/EventsDetailsPage/PayNowAside/PayNowAside';
import { PayNowPanel } from '@/components/events/EventsDetailsPage/PayNowPanel/PayNowPanel';

type EventsDetailsProps = {
  id: string;
};

export const EventsDetails = ({ id }: EventsDetailsProps) => {
  const { t } = useTranslation('events');
  const { isMdUp } = useScreen();
  const {
    isLoading,
    data,
    token,
    ticketsCart,
    totalPrice,
    removeTicket,
    toggleTicketAmount,
  } = useEventsCart({ id });

  if (isLoading) {
    return <Spinner />;
  }

  const eventDate = new Date(data?.start_date);
  const now = new Date();

  const isBuyingActive = eventDate >= now;

  return (
    <div className='pb-28 md:gap-8 lg:flex'>
      <div>
        <EventDetailsInfo {...data} />
        {token === '' && !isMdUp && <LoginCard />}
        {data.tickets.length > 0 && (
          <div>
            <p className='pb-5 text-md leading-8 text-black md:block'>
              {t('events.eventsDetails.ticketsLabel')}
            </p>
            {token === '' && !isMdUp ? null : isBuyingActive ? (
              ticketsCart?.map((item: any, index: number) => (
                <BuyTicketSection
                  key={index}
                  toggleTicketAmount={toggleTicketAmount}
                  {...item}
                />
              ))
            ) : (
              <p className='font-semibold'>{t('events.oldEvent')}</p>
            )}
            {token && (
              <PayNowPanel
                eventId={id}
                eventName={data.name}
                eventDate={data.event_date}
                tickets={ticketsCart}
                totalPrice={totalPrice}
              />
            )}
          </div>
        )}
        <EventDetailsDesc {...data} />
      </div>
      {isMdUp && (
        <div className='hidden w-full min-w-sm lg:block'>
          <PayNowAside
            eventId={id}
            token={token}
            eventName={data.name}
            eventDate={data.event_date}
            tickets={ticketsCart}
            totalPrice={totalPrice}
            removeTicket={removeTicket}
          />
        </div>
      )}
    </div>
  );
};
