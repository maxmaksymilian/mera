import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import dynamic from 'next/dynamic';

const DynamicMyUsersDetails = dynamic(
  () =>
    import('@/components/panel/MyUsers/UserDetails/MyUsersDetails').then(
      (m) => m.MyUsersDetails
    ),
  {
    ssr: false,
  }
);

const MyUsersPage = ({
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <DynamicMyUsersDetails id={id} />
    </>
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

export default MyUsersPage;
