import dynamic from 'next/dynamic';
import useTranslation from 'next-translate/useTranslation';

import { Layout } from '@/components/Layouts/Panel/Layout';

const Tickets = dynamic(
  () => import('@/components/Pok/Tickets/Tickets').then((m) => m.Tickets),
  {
    ssr: false,
  }
);

const TicketsPage = () => {
  const { t } = useTranslation('common');
  return (
    <Layout
      {...{
        title: t('sellTickets'),
        breakpoints: [
          { children: 'dashboard', href: '/pok' },
          { children: 'sellTickets' },
        ],
        hideOnMobile: { title: true, subTitle: true },
      }}
    >
      <Tickets />
    </Layout>
  );
};

export default TicketsPage;
