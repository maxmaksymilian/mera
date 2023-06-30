import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import dynamic from 'next/dynamic';
import useTranslation from 'next-translate/useTranslation';

import { Layout } from '@/components/Layouts/Panel/Layout';

const SelectedUserTickets = dynamic(
  () =>
    import(
      '@/components/Pok/Tickets/SelectedUserTickets/SelectedUserTickets'
    ).then((m) => m.SelectedUserTickets),
  {
    ssr: false,
  }
);

const SelectedUserTicketsPage = ({
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
      <SelectedUserTickets {...{ id }} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  return {
    props: {
      id: query.id,
    },
  };
};

export default SelectedUserTicketsPage;
