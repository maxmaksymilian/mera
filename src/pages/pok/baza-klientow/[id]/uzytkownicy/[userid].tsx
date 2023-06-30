import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { useApiQuery } from '@/hooks/api/useApiQuery';

import { Layout } from '@/components/Layouts/Panel/Layout';
import { MyUsersDetails } from '@/components/Pok/Users/Single/MyUsers/UserDetails/MyUsersDetails';

const ProfileDataPage = ({
  id,
  userid,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: user } = useApiQuery({
    route: 'POK_USERS_PROFILE_DATA',
    params: { id },
  });
  const { data, status, isLoading } = useApiQuery({
    route: 'POK_PROFILE_MY_USERS',
    params: { id },
    id: userid,
  });

  return (
    <Layout
      {...{
        variant: 'admin',
        title:
          status === 'success'
            ? `${data.user.full_name} - Szczegóły konta`
            : '',
        breakpoints: [
          { children: 'dashboard', href: '/pok' },
          { children: 'usersDatabase', href: '/pok/baza-klientow' },
          {
            children: user?.profile
              ? `${user.profile.first_name} ${user.profile.last_name}`
              : '',
            dynamic: true,
          },
        ],
        link: {
          children: 'Wróć do listy użytkowników',
          href: `/pok/baza-klientow/${id}/uzytkownicy`,
        },
        dynamic: { status, isLoading },
      }}
    >
      <MyUsersDetails {...{ id, userid }} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  return {
    props: {
      id: query.id,
      userid: query.userid,
    },
  };
};

export default ProfileDataPage;
