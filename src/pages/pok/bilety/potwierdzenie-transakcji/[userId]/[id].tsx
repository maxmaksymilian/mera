import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import dynamic from 'next/dynamic';
import useTranslation from 'next-translate/useTranslation';

import { Layout } from '@/components/Layouts/Panel/Layout';

const Summary = dynamic(
  () =>
    import('@/components/panel/Tickets/Order/Summary/Summary').then(
      (m) => m.Summary
    ),
  {
    ssr: false,
  }
);

const OrderSummaryPage = ({
  orderId,
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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
      <Summary {...{ orderId, id, access: 'admin' }} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  return {
    props: {
      orderId: query.id,
      id: query.userId,
    },
  };
};

export default OrderSummaryPage;
