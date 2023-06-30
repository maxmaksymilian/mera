import dynamic from 'next/dynamic';
import useTranslation from 'next-translate/useTranslation';

import { Layout } from '@/components/Layouts/Panel/Layout';

const Tickets = dynamic(
  () => import('@/components/panel/Tickets/Tickets').then((m) => m.Tickets),
  {
    ssr: false,
  }
);

const Dashboard = () => {
  const { t } = useTranslation('common');
  return (
    <Layout
      {...{
        variant: 'client',
        title: 'Moje bilety',
        subTitle: 'Kup bilety i przypisz je do kart',
        button: {
          href: '/panel/moje-bilety/zamowienie',
          children: t('buttonBuyTicket'),
        },
        hideOnMobile: {
          button: true,
          title: true,
          subTitle: true,
        },
      }}
    >
      <Tickets />
    </Layout>
  );
};

export default Dashboard;
