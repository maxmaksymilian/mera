import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';

import { convertDate } from '@/lib/helpers';

import { Link } from '@/components/commons/Link';

import image from '~/images/events/santa-banner.png';

export type EventCardProps = {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
  event_date?: string;
  price_from?: number;
  content: string;
  category: {
    id: string;
    name: string;
  };
};

export const EventCard = ({
  id,
  name,
  start_date,
  end_date,
  price_from,
  content,
  category,
}: EventCardProps) => {
  const { t } = useTranslation('common');

  return (
    <div className='mx-auto flex min-w-xxs max-w-articleCard flex-col gap-6 md:mx-0'>
      <Link href={`/wydarzenia/${id}`}>
        <div className='relative'>
          <div className='absolute left-4 z-10 translate-y-4 rounded-3xl bg-navy px-4 py-2'>
            <p className='font-bold text-white'>{convertDate(start_date)}</p>
          </div>
          <div className='absolute right-4 z-10 translate-y-4 rounded-3xl bg-navy px-4 py-2'>
            <p className='font-bold text-white'>{category.name}</p>
          </div>
          <div className='relative h-60 w-full max-w-articleCard'>
            <Image
              src={image}
              alt={name}
              layout='fill'
              objectFit='cover'
              className='rounded-2xl'
            />
          </div>
        </div>
      </Link>
      <div className='flex flex-col gap-6 pb-10'>
        <Link href={`/wydarzenia/${id}`}>
          <p className='text-md font-bold'>{name}</p>
        </Link>
        <p className='text-gray'>
          {content.length > 100 ? `${content.substring(0, 100)}...` : content}
        </p>
      </div>
      <div className='mt-auto flex justify-between'>
        <p className='text-gray'>
          {t('price')}:{' '}
          <span className='font-bold text-navy'>
            {price_from ? `od ${price_from} zł` : `Za darmo`}
          </span>
        </p>
        <Link href={`/wydarzenia/${id}`}>
          <p className='cursor-pointer font-bold text-navy'>
            {t('buyTicketsLabel')} &gt;
          </p>
        </Link>
      </div>
    </div>
  );
};
