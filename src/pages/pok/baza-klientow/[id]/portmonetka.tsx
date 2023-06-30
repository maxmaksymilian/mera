import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { LayoutUsersDatabase } from '@/components/Layouts/Panel/LayoutUsersDatabase';
import { CustomerWallet } from '@/components/Pok/Users/Single/Wallet/CustomerWallet';

const CustomerWalletPage = ({
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
    <CustomerWallet id={id} />
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

export default CustomerWalletPage;
