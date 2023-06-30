import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import dynamic from 'next/dynamic';

import { LayoutUsersDatabase } from '@/components/Layouts/Panel/LayoutUsersDatabase';

const DynamicTickets = dynamic(
  () =>
    import('@/components/Pok/Users/Single/Tickets/CustomerTickets').then(
      (m) => m.CustomerTickets
    ),
  {
    ssr: false,
  }
);

const CustomerTicketsPage = ({
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <LayoutUsersDatabase
    {...{
      id,
      variant: 'admin',
      button: {
        children: 'Sprzedaj bilet',
        href: `/pok/bilety/${id}`,
      },
      breakpoints: [
        { children: 'dashboard', href: '/pok' },
        { children: 'usersDatabase', href: '/pok/baza-klientow' },
      ],
    }}
  >
    <DynamicTickets id={id} />
  </LayoutUsersDatabase>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  return {
    props: {
      id: query.id,
    },
  };
};

export default CustomerTicketsPage;
