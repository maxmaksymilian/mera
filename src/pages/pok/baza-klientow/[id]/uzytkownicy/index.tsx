import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { LayoutUsersDatabase } from '@/components/Layouts/Panel/LayoutUsersDatabase';
import { MyUsers } from '@/components/Pok/Users/Single/MyUsers/MyUsers';

const ProfileDataPage = ({
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
    <MyUsers {...{ openModal }} />
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

export default ProfileDataPage;
