import { CardType } from '@/components/panel/MyCards/MyCardsModel';

import { Card } from './Card/Card';

export const MyCardsContent = ({
  data,
  handleReload,
}: {
  data: CardType[];
  handleReload: () => void;
}) => (
  <div className='md:px-2'>
    <div className='grid gap-2.5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3'>
      {data?.map((item, index) => (
        <Card
          key={item?.number || index}
          isRemovable={true}
          handleReload={handleReload}
          {...item}
        />
      ))}
    </div>
  </div>
);
