import { checkIsStringValueInObject } from '@/lib/helpers';

import {
  HistoryCard,
  HistoryCardProps,
} from '@/components/commons/Cards/HistoryCard/HistoryCard';
import { Link } from '@/components/commons/Link';
import { Skeleton } from '@/components/commons/Skeleton/Skeleton';

import { useHistory } from './useHistory';

export const History = () => {
  const { data, status, isLoading } = useHistory();

  return (
    <div>
      <Link href='/panel/moje-dane' className='text-navy'>
        Wróć do moich danych
      </Link>
      {status === 'success' && !isLoading ? (
        <div className='pt-6'>
          {data
            .filter(
              (item: HistoryCardProps) =>
                item.changes.attributes &&
                checkIsStringValueInObject(item.changes.attributes)
            )
            .map((item: HistoryCardProps) => (
              <HistoryCard key={item.id} {...item} />
            ))}
        </div>
      ) : (
        <Skeleton {...{ count: 4, height: 200 }} />
      )}
    </div>
  );
};
