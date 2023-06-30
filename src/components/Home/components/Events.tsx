import { useApiQuery } from '@/hooks/api/useApiQuery';

import { Button } from '@/components/commons/Button';
import {
  EventCard,
  EventCardProps,
} from '@/components/commons/Cards/EventCard';
import { Link } from '@/components/commons/Link';
import { CardsSkeleton } from '@/components/commons/Skeleton/components/CardsSkeleton';

export type EventsProps = {
  title?: string;
  buttonText?: string;
};

export const Events = ({ title, buttonText }: EventsProps) => {
  const { data: events, status, isLoading } = useApiQuery({ route: 'EVENTS' });

  return (
    <div className='flex flex-col gap-8 pt-8 md:gap-14 md:pt-16'>
      {title && <h2>{title}</h2>}
      <div className='flex flex-col flex-wrap gap-8 md:flex-row md:justify-between lg:flex-nowrap'>
        {status && isLoading && !events ? (
          <CardsSkeleton />
        ) : (
          events.items
            .filter((_event: EventCardProps, index: number) => index < 3)
            .map((event: EventCardProps) => (
              <EventCard {...event} key={event.id} />
            ))
        )}
      </div>
      <div className='flex w-full items-center justify-center pt-8'>
        <Link href='/wydarzenia'>
          <Button>{buttonText}</Button>
        </Link>
      </div>
    </div>
  );
};
