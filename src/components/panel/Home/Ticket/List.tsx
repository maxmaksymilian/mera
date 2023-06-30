import useTranslation from 'next-translate/useTranslation';

import { Ticket, TicketProps } from './Ticket';
export const List = ({ tickets }: { tickets: TicketProps[] }) => {
  const { t } = useTranslation('common');
  return (
    <div className='grid pt-0 md:pt-4'>
      {tickets ? (
        <>
          {tickets.map((ticket, index) => (
            <Ticket key={index} {...ticket} />
          ))}
        </>
      ) : (
        <p>{t('noTickets')}</p>
      )}
    </div>
  );
};
