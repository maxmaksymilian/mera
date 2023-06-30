import Image, { StaticImageData } from 'next/image';
import useTranslation from 'next-translate/useTranslation';

import { clsxm } from '@/lib';
import { shortenEventTitle } from '@/lib/helpers';
import { useFileDownload } from '@/hooks/useFileDownload';
import { useScreen } from '@/hooks/useScreen';

import { Button } from '@/components/commons/Button';

import eventImage from '~/images/homepage/santa.png';

export type EventPanelCardProps = {
  id: string;
  order_id: string;
  name: string;
  start_date?: string;
  end_date?: string;
  event_date?: string;
  tickets: {
    id: string;
    name: string;
  }[];
  image?: StaticImageData;
};

export const EventPanelCard = ({
  id,
  order_id,
  name,
  event_date,
  start_date,
  end_date,
  tickets = [],
}: EventPanelCardProps) => {
  const { isMdUp } = useScreen();
  const { t } = useTranslation('common');
  const { getFile } = useFileDownload({
    route: 'EVENT_DOWNLOAD_PDF',
    params: { orderId: order_id, eventId: id },
  });

  return (
    <div
      className={clsxm(
        'event-item-container',
        'flex flex-col items-center gap-10 pb-8 md:flex-row'
      )}
    >
      <div className='relative flex h-[195px] w-[300px] max-w-full justify-center md:h-[113px] md:w-[194px]'>
        <Image
          src={eventImage}
          alt={name}
          layout='fill'
          objectFit='cover'
          objectPosition='center'
        />
      </div>
      <div className='flex flex-col items-start'>
        <span className='hidden rounded-3xl bg-navy px-4 py-1 text-sm font-semibold text-white md:inline'>
          {start_date}
        </span>
        <h1 className='w-11/12 pt-2 pb-10 text-left text-sm font-normal leading-6 text-black md:w-full md:pb-2 md:text-md md:font-bold md:leading-8'>
          {isMdUp ? shortenEventTitle(name) : name}
        </h1>

        {isMdUp ? (
          <div className='hidden gap-2.5 md:flex md:flex-row'>
            {tickets.map(({ name, id }) => (
              <span key={id}>{name}</span>
            ))}
          </div>
        ) : (
          <div className='flex w-full flex-col gap-2.5 md:hidden'>
            <div className='flex w-full items-center justify-between'>
              <span className='block w-full flex-1 text-sm text-gray'>
                {t('eventDate')}
              </span>
              <span className='block w-full flex-1 text-sm'>{event_date}</span>
            </div>
            {tickets.map(({ name, id }) => (
              <div
                key={id}
                className='flex w-full items-center justify-between'
              >
                <span className='block w-full flex-1 text-sm text-gray'>
                  {name}
                </span>
                <span className='block w-full flex-1 text-sm'>{0} x XX zł</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className='w-full md:ml-auto md:w-56'>
        <Button
          variant='primary'
          handleClick={() => getFile({})}
          className='hidden md:block'
        >
          {t('buttonExportPDF')}
        </Button>
        <Button
          variant='secondary'
          handleClick={() => getFile({})}
          className='h-12 w-full md:hidden'
        >
          {t('buttonExportPDF')}
        </Button>
      </div>
    </div>
  );
};
