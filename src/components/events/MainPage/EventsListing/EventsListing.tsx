import useTranslation from 'next-translate/useTranslation';

import { Button } from '@/components/commons/Button';
import {
  Event,
  EventsSection,
} from '@/components/events/components/EventsSection/EventsSection';

export type EventsListingProps = {
  fetchMoreEvents: () => void;
  events?: Event[];
};

export const EventsListing = ({
  fetchMoreEvents,
  events = [],
}: EventsListingProps) => {
  const { t } = useTranslation('events');

  return (
    <div className='flex flex-col gap-8 pt-8 md:gap-14 md:pt-16'>
      <div className='flex flex-col flex-wrap gap-8 md:grid md:grid-cols-2 md:flex-row md:justify-between lg:grid-cols-3 lg:flex-nowrap'>
        <EventsSection events={events} />
      </div>
      <div className='flex w-full items-center justify-center pt-8'>
        <Button
          className='mx-auto hidden w-full md:w-auto'
          handleClick={fetchMoreEvents}
        >
          {t('events.eventsListing.moreEventsBtn')}
        </Button>
      </div>
    </div>
  );
};
