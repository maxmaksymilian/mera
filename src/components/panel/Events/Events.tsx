import useTranslation from 'next-translate/useTranslation';
import Skeleton from 'react-loading-skeleton';

import { clsxm } from '@/lib';

import { Button } from '@/components/commons/Button';
import {
  EventPanelCard,
  EventPanelCardProps,
} from '@/components/commons/Cards/EventPanelCard';
import { Filters } from '@/components/commons/Filters/Filters';
import { RangeDatepicker } from '@/components/commons/Form/Fields/RangeDatepicker';
import { SearchInput } from '@/components/commons/Form/Fields/SearchInput';

import { useEvents } from './useEvents';

export const Events = () => {
  const { t } = useTranslation('common');
  const { active, setActive, data, filters, isLoading, isRefetching } =
    useEvents();

  const dataFiltred = data
    ? active === 'incoming'
      ? data?.incoming
      : data?.ended
    : [];

  return (
    <div>
      <div className='mx-auto mt-0 max-w-screen-lg pb-5'>
        <Filters {...filters}>
          <SearchInput
            name='search'
            className='h-12'
            placeholder='searchTicket'
          />
          <RangeDatepicker
            fromName='date_from'
            toName='date_to'
            minYear={10}
            fromPlaceholder='choiceDate'
            toPlaceholder='choiceDate'
          />
        </Filters>
      </div>
      <div className='hidden gap-5 md:flex'>
        <Button
          variant='noStyling'
          className={clsxm(active === 'incoming' && 'font-bold')}
          handleClick={() => setActive('incoming')}
        >{`${t('incoming')} (${data?.incoming?.length || 0})`}</Button>
        <Button
          variant='noStyling'
          className={clsxm(active === 'ended' && 'font-bold')}
          handleClick={() => setActive('ended')}
        >{`${t('ended')} (${data?.ended?.length || 0})`}</Button>
      </div>
      <div className='events-container pt-10 md:pt-0'>
        {(isLoading && !data) || isRefetching ? (
          <Skeleton {...{ count: 3, height: 145 }} />
        ) : (
          dataFiltred.map((item: EventPanelCardProps) => (
            <EventPanelCard key={item.id} {...item} />
          ))
        )}
      </div>
    </div>
  );
};
