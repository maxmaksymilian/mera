import dynamic from 'next/dynamic';

const DynamicEvents = dynamic(
  () =>
    import('@/components/events/MainPage/EventsPage/EventsPage').then(
      (m) => m.EventsPage
    ),
  {
    ssr: false,
  }
);

const Events = () => <DynamicEvents />;

export default Events;
