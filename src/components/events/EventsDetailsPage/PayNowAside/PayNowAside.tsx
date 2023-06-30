import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import SantaImage from 'public/images/homepage/santa.png';
import { useState } from 'react';

import { useTicketsStore } from '@/lib/state/useTicketsStore';
import { useApiMutation } from '@/hooks/api/useApiMutation';
import { TicketType } from '@/hooks/useEventsCart';

import { Button } from '@/components/commons/Button';
import { FormMessage } from '@/components/commons/FormMessage';
import { Icon } from '@/components/commons/Icon/Icon';
import { Link } from '@/components/commons/Link';
import { Spinner } from '@/components/commons/Spinner';

export type PayNowAsideProps = {
  eventId: string;
  token: string;
  eventName: string;
  eventDate: string;
  image?: StaticImageData;
  tickets?: TicketType[] | null;
  totalPrice?: number;
  removeTicket: (id: string) => void;
};

export const PayNowAside = ({
  eventId,
  token,
  eventName,
  eventDate,
  tickets,
  totalPrice,
  removeTicket,
}: PayNowAsideProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorContent, setErrorContent] = useState<string | null>();
  const [isTpay, setIsTpay] = useState<boolean>(false);
  const router = useRouter();
  const { t } = useTranslation('events');
  const { addTickets, addEvent } = useTicketsStore();
  const { mutate } = useApiMutation({
    method: 'POST',
    route: 'PROFILE_MY_EVENTS_ORDER',
  });

  const buyTickets = () => {
    const tempTickets = tickets?.filter((ticket) => ticket.amount > 0);
    const combinedTicketsArr = tempTickets?.flatMap((ticket) =>
      Array.from({ length: ticket.amount }, () => ({ id: ticket.id }))
    );

    const payload = {
      id: eventId,
      item: combinedTicketsArr || [],
    };

    setLoading(true);
    setErrorContent(null);
    mutate(payload, {
      onSuccess: ({ error, data }) => {
        if (error) {
          setLoading(false);
          return setErrorContent(error);
        }
        addEvent({ name: eventName, date: eventDate });
        addTickets(tempTickets || []);
        setLoading(false);
        router.push(data);
      },
    });
  };

  return (
    <div className='rounded-2xl'>
      <div>
        <Image
          width={380}
          height={247}
          src={SantaImage}
          alt={eventName}
          layout='fixed'
        />
      </div>
      <div className='flex max-w-xs -translate-y-5 flex-col items-center gap-5 rounded-b-2xl bg-cloud py-10 px-8'>
        {token === '' ? (
          <>
            <p className='text-center text-md leading-7 text-black'>
              {t('events.payNowAside.headline')}
            </p>
            <Link href='/auth/logowanie'>
              <Button variant='primary' className='h-12'>
                {t('events.payNowAside.loginBtn')}
              </Button>
            </Link>
            <Link href='/auth/rejestracja'>
              <Button variant='quaternary' className='h-12'>
                {t('events.payNowAside.registerBtn')}
              </Button>
            </Link>
          </>
        ) : (
          <div className='w-full'>
            <p className='text-left text-md font-bold leading-8'>
              {t('events.payNowAside.yourOrderLabel')}
            </p>
            <div className='tickets-summary border-b border-black py-2.5'>
              {tickets?.map(({ id, name, amount, price }) =>
                amount > 0 ? (
                  <div
                    key={id}
                    className='ticket-row flex items-center justify-between py-1.5'
                  >
                    <div className='flex items-center gap-2.5'>
                      <button onClick={() => removeTicket(id)}>
                        <Icon name='closeticket' />
                      </button>
                      <p className='text-sm leading-6 text-black'>
                        {name}
                        &nbsp; ({amount}x)
                      </p>
                    </div>
                    <p className='whitespace-nowrap pl-1 text-base leading-6 text-black'>
                      {price.toFixed(2).toString().replace('.', ',')} zł
                    </p>
                  </div>
                ) : null
              )}
            </div>
            <div className='summary py-2.5'>
              <div className='flex items-center justify-between'>
                <p className='text-base leading-6 text-black'>
                  {t('events.payNowAside.totalPriceLabel')}
                </p>
                <p className='text-base leading-6 text-black'>
                  {totalPrice
                    ? totalPrice.toFixed(2).toString().replace('.', ',')
                    : '0,00'}{' '}
                  zł
                </p>
              </div>
            </div>
            {tickets?.some((ticket) => ticket.amount > 0) ? (
              <>
                <div className='py-2.5 pt-5'>
                  <Button className='w-full' handleClick={buyTickets}>
                    {loading ? (
                      <Spinner />
                    ) : (
                      t('events.payNowAside.buyTicketsBtn')
                    )}
                  </Button>
                </div>
              </>
            ) : null}
            {errorContent && (
              <FormMessage success={false}>{errorContent}</FormMessage>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
