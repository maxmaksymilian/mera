import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import dynamic from 'next/dynamic';

import { LayoutUsersDatabase } from '@/components/Layouts/Panel/LayoutUsersDatabase';

const Events = dynamic(
  () =>
    import('@/components/Pok/Users/Single/Events/Events').then((m) => m.Events),
  {
    ssr: false,
  }
);

const CustomerEvents = ({
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
    <Events {...{ id }} />
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

export default CustomerEvents;
