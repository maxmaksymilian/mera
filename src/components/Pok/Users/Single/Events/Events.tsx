import {
  EventPanelCard,
  EventPanelCardProps,
} from '@/components/commons/Cards/EventPanelCard';
import { Filters } from '@/components/commons/Filters/Filters';
import { RangeDatepicker } from '@/components/commons/Form/Fields/RangeDatepicker';
import { SearchInput } from '@/components/commons/Form/Fields/SearchInput';
import { Skeleton } from '@/components/commons/Skeleton/Skeleton';

import { useEvents } from './useEvents';

export type EventsProps = {
  id: string;
};

export const Events = (props: EventsProps) => {
  const { data, filters, isLoading, isRefetching } = useEvents(props);

  const dataFiltred =
    data?.incoming && data?.ended ? [...data.incoming, ...data.ended] : [];

  return (
    <div>
      <div className='mx-auto mt-0 max-w-screen-lg pb-5'>
        <Filters {...{ ...filters, className: 'mb-8' }}>
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
