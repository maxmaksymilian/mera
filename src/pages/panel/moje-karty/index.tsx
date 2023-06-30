import dynamic from 'next/dynamic';
import useTranslation from 'next-translate/useTranslation';

import { Layout } from '@/components/Layouts/Panel/Layout';

const MyCards = dynamic(
  () => import('@/components/panel/MyCards/MyCards').then((m) => m.MyCards),
  {
    ssr: false,
  }
);

const ActiveCards = () => {
  const { t } = useTranslation('common');
  return (
    <Layout
      {...{
        variant: 'client',
        title: t('myCardsLabel'),
        subTitle: t('myCardsSubTitle'),
        button: {
          href: '/panel/moje-bilety/zamowienie',
          children: t('buttonBuyTicket'),
        },
        hideOnMobile: { title: true, button: true },
      }}
    >
      <MyCards />
    </Layout>
  );
};

export default ActiveCards;
