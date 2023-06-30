import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import dynamic from 'next/dynamic';

import { Container } from '@/components/commons/Container';

const DynamicCaseDetails = dynamic(
  () =>
    import('@/components/panel/MyCases/CaseDetails/CaseDetails').then(
      (m) => m.CaseDetails
    ),
  {
    ssr: false,
  }
);

const MyCasesDetailsPage = ({
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <Container className='flex flex-col gap-9 pt-32 pb-24'>
    <DynamicCaseDetails id={id} />
  </Container>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  return {
    props: {
      id: query.id,
    },
  };
};

export default MyCasesDetailsPage;
