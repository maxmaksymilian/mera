import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import dynamic from 'next/dynamic';

const DynamicCardDetails = dynamic(
  () =>
    import('@/components/panel/MyCards/CardDetails/CardDetails').then(
      (m) => m.CardDetails
    ),
  {
    ssr: false,
  }
);

const ActiveCardDetailsPage = ({
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <DynamicCardDetails id={id} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  return {
    props: {
      id: query.id,
    },
  };
};

export default ActiveCardDetailsPage;
