import dynamic from 'next/dynamic';

import { Layout } from '@/components/Layouts/Panel/Layout';

const History = dynamic(
  () =>
    import('@/components/panel/MyData/History/History').then((m) => m.History),
  {
    ssr: false,
  }
);

const HistoryPage = () => (
  <Layout
    {...{
      variant: 'client',
      title: 'Historia zmian',
      subTitle: 'Sprawdź historię zmian na swoim koncie',
      hideOnMobile: {
        subTitle: true,
      },
    }}
  >
    <History />
  </Layout>
);

export default HistoryPage;
