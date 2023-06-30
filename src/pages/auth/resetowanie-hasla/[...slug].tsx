import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { Layout } from '@/components/Layouts/Auth/Layout';
import { NewPassword } from '@/components/panel/Auth/NewPassword';

const NewPasswordPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <Layout title='newPassword.title' content='newPassword.content'>
    <NewPassword token={data[0]} email={data[1]} />
  </Layout>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query: slug } = context;
  if (slug.slug && slug.slug.length !== 2)
    return {
      notFound: true,
    };

  return {
    props: {
      data: slug.slug,
    },
  };
};

export default NewPasswordPage;
