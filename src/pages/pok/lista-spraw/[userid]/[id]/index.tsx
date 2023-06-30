import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import dynamic from 'next/dynamic';

const DynamicCaseDetails = dynamic(
  () =>
    import(
      '@/components/Pok/Dashboard/CasesListPage/CaseDetails/CaseDetails'
    ).then((m) => m.CaseDetails),
  {
    ssr: false,
  }
);

const CustomerServiceCaseDetailsPage = ({
  userId,
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <DynamicCaseDetails {...{ userId: userId, id: id }} />
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;

  return {
    props: {
      userId: query.userid,
      id: query.id,
    },
  };
};

export default CustomerServiceCaseDetailsPage;
