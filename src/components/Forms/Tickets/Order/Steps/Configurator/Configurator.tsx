import useTranslation from 'next-translate/useTranslation';

import { TicketType } from '@/components/commons/Cards/OrderTicketCard';

import { Ticket } from './components/Ticket';
import { useConfigurator } from './useConfigurator';

export const Configurator = () => {
  const { t } = useTranslation('common');
  const { values, updateTicket, getExpirationDate } = useConfigurator();

  return (
    <div className='pb-52 md:pb-0'>
      <p className='hidden text-2xl font-bold md:block'>
        {t('choseTicketActivationDate')}
      </p>
      <p className='pt-3 text-gray'>{t('purchasedTicketsDateInfo')}</p>
      {values.item.map((item: TicketType, index: number) => (
        <Ticket
          key={`${item.id}-${index}`}
          {...{
            ...item,
            expire_date: getExpirationDate(item.activation_date, item.validity),
            handleChange: (dates) => updateTicket(index, dates),
          }}
        />
      ))}
    </div>
  );
};
