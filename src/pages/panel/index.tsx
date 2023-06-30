import dynamic from 'next/dynamic';
import useTranslation from 'next-translate/useTranslation';

import { useAppStore } from '@/lib';

import { Layout } from '@/components/Layouts/Panel/Layout';

const Home = dynamic(
  () => import('@/components/panel/Home/Home').then((m) => m.Home),
  {
    ssr: false,
  }
);

const Dashboard = () => {
  const { t } = useTranslation('common');
  const {
    personalData: {
      profile: { first_name },
    },
  } = useAppStore();

  return (
    <Layout
      {...{
        variant: 'client',
        title: `Witaj ${first_name}!`,
        subTitle: t('subTitleWhatToday'),
        button: {
          href: '/panel/moje-bilety/zamowienie',
          children: t('buttonBuyTicket'),
        },
      }}
    >
      <Home />
    </Layout>
  );
};

export default Dashboard;
