import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import dynamic from 'next/dynamic';

import { LayoutUsersDatabase } from '@/components/Layouts/Panel/LayoutUsersDatabase';

const DynamicCustomerCards = dynamic(
  () =>
    import('@/components/Pok/Users/Single/Cards/CustomerCardsPage').then(
      (m) => m.CustomerCardsPage
    ),
  {
    ssr: false,
  }
);

const CustomerCards = ({
  id,
  openModal,
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
    <DynamicCustomerCards {...{ id, openModal }} />
  </LayoutUsersDatabase>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  return {
    props: {
      id: query.id,
      openModal: query.openModal ? true : false,
    },
  };
};

export default CustomerCards;
