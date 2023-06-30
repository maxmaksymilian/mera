import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import CultureImage from 'public/images/events/santa-banner.png';

export type EventDetailsDescProps = {
  name: string;
  content?: string;
};

export const EventDetailsDesc = ({
  name = '',
  content,
}: EventDetailsDescProps) => {
  const { t } = useTranslation('events');
  return (
    <div className='py-5'>
      <h2 className='pb-5 text-base font-normal leading-6 text-black md:text-md md:leading-8'>
        {t('events.eventDetailsDesc.headline')}
      </h2>
      <div className='relative h-40 md:h-72 md:w-full'>
        <Image src={CultureImage} alt={name} layout='fill' objectFit='cover' />
      </div>
      <p className='py-5 text-sm leading-6 text-gray md:pt-8 md:text-base'>
        {content}
      </p>
    </div>
  );
};
