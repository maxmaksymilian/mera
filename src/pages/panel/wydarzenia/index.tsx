import dynamic from 'next/dynamic';

import { Layout } from '@/components/Layouts/Panel/Layout';

const Events = dynamic(
  () => import('@/components/panel/Events/Events').then((m) => m.Events),
  {
    ssr: false,
  }
);

const EventsPage = () => (
  <Layout
    {...{
      variant: 'client',
      title: 'Moje wydarzenia',
      subTitle: 'Lista Twoich zakupionych wydarzeń',
      hideOnMobile: {
        title: true,
      },
    }}
  >
    <Events />
  </Layout>
);

export default EventsPage;
