import { StaticImageData } from 'next/image';

import {
  EventCard,
  EventCardProps,
} from '@/components/commons/Cards/EventCard';

export type Event = {
  id: number;
  name: string;
  content: string;
  end_date: string;
  start_date: string;
  category: {
    id: string;
    name: string;
  };
  number_of_seats: string;
  number_of_seats_available: string;
  price_from?: number;
  event_date?: string;
  image?: string | StaticImageData;
};

export type EventsSectionProps = {
  events: EventCardProps[];
};

export const EventsSection = ({ events }: EventsSectionProps) => (
  <>
    {events.map((event) => (
      <EventCard key={event.id} {...event} />
    ))}
  </>
);
