import { PrimaryCard } from '@/components/commons/Cards/PrimaryCard';
import { SecondaryCard } from '@/components/commons/Cards/SecondaryCard';
import { ListProps } from '@/components/commons/List/@types/List';
import { Skeleton } from '@/components/commons/Skeleton/Skeleton';

export const CardType = {
  primary: PrimaryCard,
  secondary: SecondaryCard,
};

export const CardsList = ({
  isLoading,
  isRefetching,
  status,
  records,
  cardType,
  headers,
}: ListProps) => {
  const Card = CardType[cardType];

  if ((isLoading && status !== 'success') || isRefetching) {
    return <Skeleton {...{ count: 3, height: 400 }} />;
  }

  return (
    <div className='cards-container'>
      {records.map(({ id, ...props }) => (
        <div key={id} className='border-b border-b-cloud py-7'>
          <Card {...{ headers, id, ...props }} />
        </div>
      ))}
    </div>
  );
};
