import useTranslation from 'next-translate/useTranslation';
import Skeleton from 'react-loading-skeleton';

import { UseApiQueryProps } from '@/hooks/api/useApiQuery';

import { Button } from '@/components/commons/Button';
import {
  OrderTicketCard,
  TicketType,
} from '@/components/commons/Cards/OrderTicketCard';
import { CardSelect } from '@/components/commons/Form/Fields/Select/DynamicVariants/CardSelect';
import SearchInput from '@/components/commons/Form/Ui/SearchInput';
import { FormProps } from '@/components/Forms/@types/Form';

import { useTickets } from './useTickets';

type TicketsProps = Pick<FormProps, 'access'> & UseApiQueryProps;

export const Tickets = ({ access, ...props }: TicketsProps) => {
  const { t } = useTranslation('common');
  const {
    search,
    setSearch,
    tickets,
    toggleTicket,
    countTicket,
    isLoading,
    status,
  } = useTickets(props);

  return (
    <div className='pb-[50px] md:pb-0'>
      <div className='mt-2 mb-8'>
        <CardSelect
          name='card'
          label='choiceCard'
          placeholder='card'
          isClear
          clearLabel='empty'
          access={access}
        />
      </div>
      <div className='flex justify-between'>
        <p className='text-2xl font-bold'>{t('proposedTickets')}</p>
        <Button
          variant='quaternary'
          className='h-8 p-0'
          handleClick={() => setSearch('')}
        >
          <p className='hidden font-bold text-navy md:block'>{t('showAll')}</p>
        </Button>
      </div>
      <div className='mt-6 mb-8'>
        <SearchInput
          name='search'
          placeholder='searchTicket'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onBlur={(e) => setSearch(e.target.value)}
          clearField={() => setSearch('')}
        />
      </div>
      <Button
        variant='secondary'
        fullWidth
        className='mb-5 -mt-3 md:hidden'
        handleClick={() => setSearch('')}
      >
        {t('showAll')}
      </Button>
      {isLoading || status !== 'success' || !tickets ? (
        <Skeleton {...{ count: 10, height: 50 }} />
      ) : (
        tickets.map((item: TicketType) => (
          <OrderTicketCard
            key={item.id}
            {...{
              ...item,
              count: countTicket(item.id),
              handleAdd: () => toggleTicket('add', item.id),
              handleRemove: () => toggleTicket('remove', item.id),
            }}
          />
        ))
      )}
    </div>
  );
};
