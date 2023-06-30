import useTranslation from 'next-translate/useTranslation';

import { useApiQuery } from '@/hooks/api/useApiQuery';

import { Spinner } from '@/components/commons/Spinner';

import { ActiveTicketRow } from './ActiveTicketRow/ActiveTicketRow';

export interface ITicket {
  created_at: string;
  end_date: string;
  id: string;
  name: string;
  start_date: string;
  status: string;
  validity: number;
}

export const ActiveTicketsSection = ({ id }: { id: string }) => {
  const { t } = useTranslation('common');
  const { isLoading, data } = useApiQuery({ route: 'PROFILE_MY_CARDS', id });

  return (
    <section className='w-full max-w-subMd'>
      <div className='border-cloud pb-6 md:border-b'>
        <h2 className='text-base font-bold leading-6 text-black md:text-md md:leading-8'>
          {t('activeTicket')}
        </h2>
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className='md:pt-8'>
          {data?.tickets?.map((ticket: ITicket) => (
            <ActiveTicketRow
              key={ticket.id}
              user={data.card.user}
              ticket={ticket}
            />
          ))}
        </div>
      )}
    </section>
  );
};
