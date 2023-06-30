import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import dynamic from 'next/dynamic';
import useTranslation from 'next-translate/useTranslation';

import { Container } from '@/components/commons/Container';
import { Link } from '@/components/commons/Link';

const DynamicEventDetails = dynamic(
  () =>
    import(
      '@/components/events/EventsDetailsPage/EventsDetails/EventsDetails'
    ).then((m) => m.EventsDetails),
  {
    ssr: false,
  }
);

const EventsDetailsPage = ({
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { t } = useTranslation('events');
  return (
    <Container className='pt-28'>
      <Link
        href='/wydarzenia/'
        className='hidden pb-5 text-base leading-6 text-navy md:block'
      >
         {t('events.backEventList')}
      </Link>
      <DynamicEventDetails id={id} />
    </Container>
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

export default EventsDetailsPage;
