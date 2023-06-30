import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import { clsxm } from '@/lib';
import { useTicketsStore } from '@/lib/state/useTicketsStore';
import { useApiMutation } from '@/hooks/api/useApiMutation';
import { TicketType } from '@/hooks/useEventsCart';

import { Button } from '@/components/commons/Button';
import { FormMessage } from '@/components/commons/FormMessage';
import { Spinner } from '@/components/commons/Spinner';

export type PayNowPanelProps = {
  eventId: string;
  eventDate: string;
  eventName: string;
  totalPrice: number;
  tickets?: TicketType[] | null;
};

export const PayNowPanel = ({
  eventId,
  eventDate,
  eventName,
  totalPrice,
  tickets,
}: PayNowPanelProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorContent, setErrorContent] = useState<string | null>();
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
    <>
      <div
        className={clsxm(
          'fixed bottom-0 left-0 right-0 z-30 translate-y-full  border border-cloud bg-white p-5 opacity-0 lg:hidden',
          'transition-all duration-300',
          totalPrice && 'translate-y-0 opacity-100'
        )}
      >
        {errorContent && (
          <div className='pb-2.5'>
            <FormMessage success={false}>{errorContent}</FormMessage>
          </div>
        )}
        <div className='flex items-center justify-between'>
          <div>
            <p className='text-sm leading-6 text-gray'>
              {t('events.payNowPanel.totalPriceLabel')}
            </p>
            <p className='text-sm font-bold leading-6 text-black'>
              {totalPrice.toFixed(2).toString().replace('.', ',')} zł
            </p>
          </div>
          <div>
            <Button className='w-full' handleClick={buyTickets}>
              {loading ? <Spinner /> : t('events.payNowPanel.payNowBtn')}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
