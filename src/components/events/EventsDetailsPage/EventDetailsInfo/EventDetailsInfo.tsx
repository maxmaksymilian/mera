import Image from 'next/image';

import { convertDate } from '@/lib/helpers';

import { Event } from '@/components/events/components/EventsSection/EventsSection';

import SantaImage from '~/images/homepage/santa.png';

export type EventDetailsInfoProps = Event;

export const EventDetailsInfo = ({
  start_date,
  category,
  name,
  content,
}: EventDetailsInfoProps) => (
  <div className='mx-auto flex min-w-xxs max-w-sm flex-col gap-6 sm:max-w-none md:mx-0 md:w-full'>
    <div className='relative mx-auto max-w-articleCard sm:w-full md:mx-0 md:flex md:gap-2.5 md:pb-5'>
      <div className='absolute left-4 z-10 translate-y-4 rounded-3xl bg-navy px-4 py-2 md:static md:translate-y-0'>
        <p className='font-bold text-white'>{convertDate(start_date)}</p>
      </div>
      <div className='absolute right-4 z-10 translate-y-4 rounded-3xl bg-navy px-4 py-2 md:static md:translate-y-0'>
        <p className='font-bold text-white'>{category.name}</p>
      </div>
      <div className='md:hidden'>
        <Image src={SantaImage} alt={name} className='min-w-full' />
      </div>
    </div>
    <div className='flex flex-col gap-6 pb-10 md:w-full'>
      <p className='text-md font-normal leading-8 md:w-full md:text-lg md:leading-lg'>
        {name}
      </p>
      <p className='text-sm leading-6 text-gray'>{content}</p>
    </div>
  </div>
);
