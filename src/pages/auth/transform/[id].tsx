import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { Layout } from '@/components/Layouts/Auth/Layout';
import { Transform } from '@/components/panel/Auth/Transform';

const TransformPage = ({
  token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <Layout title='transform.title' content='transform.content'>
    <Transform {...{ token }} />
  </Layout>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  return {
    props: {
      token: query.id,
    },
  };
};

export default TransformPage;
