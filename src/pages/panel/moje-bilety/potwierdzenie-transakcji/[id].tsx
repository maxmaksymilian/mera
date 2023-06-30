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
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { t } = useTranslation('common');
  return (
    <Layout
      {...{
        variant: 'client',
        title: `Kup bilet`,
        subTitle: 'Kup bilety',
        button: {
          href: '/panel/moje-bilety/zamowienie',
          children: t('buttonBuyTicket'),
        },
      }}
    >
      <Summary {...{ orderId, access: 'client' }} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  return {
    props: {
      orderId: query.id,
    },
  };
};

export default OrderSummaryPage;
