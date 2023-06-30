import dynamic from 'next/dynamic';
import useTranslation from 'next-translate/useTranslation';

import { Container } from '@/components/commons/Container';

import { AdvertContainer } from './components/AdvertContainer';
import { Events } from './components/Events';

const DynamicBanner = dynamic(
  () => import('./components/Banner').then((m) => m.Banner),
  {
    ssr: false,
  }
);

export const Home = () => {
  const { t } = useTranslation('common');

  return (
    <Container>
      <div className='pb-8 pt-28 lg:pb-16'>
        <DynamicBanner
          content={t('pages.home.content')}
          buttonText={t('pages.home.buttonText')}
          href='/panel/moje-bilety/zamowienie'
        />
        <AdvertContainer
          title='Tytuł komunikatu'
          content='Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the'
        />
        <Events
          title={t('pages.home.events.title')}
          buttonText={t('pages.home.events.buttonText')}
        />
      </div>
    </Container>
  );
};
