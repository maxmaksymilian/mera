import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

import { Layout } from '@/components/Layouts/Panel/Layout';

const OrderForm = dynamic(
  () =>
    import('@/components/Forms/Tickets/Order/OrderForm').then(
      (m) => m.OrderForm
    ),
  {
    ssr: false,
  }
);

const Dashboard = ({
  cardId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { push } = useRouter();
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
      <OrderForm
        {...{
          cardId,
          route: 'ORDER_CREATE',
          handleSubmit: ({ data }) => push(data),
          ticketsQuery: { route: 'ORDER_TICKETS' },
        }}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;

  return {
    props: {
      cardId: query.cardid || null,
    },
  };
};

export default Dashboard;
