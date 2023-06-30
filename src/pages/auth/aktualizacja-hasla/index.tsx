import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { UpdatePassword } from '@/components/panel/Auth/UpdatePassword/UpdatePassword';

const UpdatePasswordPage = ({
  token,
  email,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <UpdatePassword {...{ token, email }} />
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;

  if (!query || !query.email || !query.token)
    return {
      notFound: true,
    };

  return {
    props: {
      ...query,
    },
  };
};

export default UpdatePasswordPage;
