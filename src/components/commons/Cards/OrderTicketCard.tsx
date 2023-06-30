import useTranslation from 'next-translate/useTranslation';

import { Icon } from '@/components/commons/Icon/Icon';

export type TicketType = {
  id: string;
  name: string;
  price: number;
  type: string;
  validity: number;
  activation_date: string;
};

type OrderTicketCardProps = {
  count: number;
  handleAdd: () => void;
  handleRemove: () => void;
} & TicketType;

export const OrderTicketCard = ({
  name,
  price,
  count,
  handleAdd,
  handleRemove,
}: OrderTicketCardProps) => {
  const { t } = useTranslation('common');

  return (
    <div className='grid pb-4 lg:flex lg:justify-between'>
      <div className='flex lg:grid lg:grid-flow-col'>
        <Icon name='ticket' />
        <div className='ml-6 flex flex-col lg:min-w-[50%]'>
          <p className='text-sm font-bold lg:text-base'>{name}</p>
          <p className='text-sm text-gray lg:text-base'>{t('validAllMonth')}</p>
        </div>
      </div>
      <div className='inline-flex flex-col lg:flex lg:flex-row lg:justify-end'>
        <div className='mt-3 mb-3 flex lg:mb-0 lg:mt-0 lg:grid lg:grid-flow-col'>
          <div className='flex min-w-[100px] flex-row-reverse lg:ml-10 lg:mr-2 lg:block'>
            <p className='text-sm font-bold lg:text-base'>50%</p>
            <p className='mr-4 text-sm text-gray lg:mr-0 lg:text-base'>
              {t('discountLabel')}
            </p>
          </div>
          <div className='ml-5 flex min-w-[100px] flex-row-reverse lg:ml-2 lg:mr-8 lg:block'>
            <p className='text-sm font-bold text-navy lg:text-base'>
              {price} zł
            </p>
            <p className='mr-4 text-sm text-gray lg:mr-0 lg:text-base'>
              {t('price')}
            </p>
          </div>
        </div>
        <div className='mt-1 inline-flex'>
          <button
            type='button'
            className='h-10 w-10 bg-cloud px-3 text-center font-bold text-navy'
            onClick={handleRemove}
          >
            -
          </button>
          <p className='mx-3 h-10 w-full border border-cloud border-y-cloud px-3 pt-2 text-center font-bold text-navy lg:mx-0 lg:w-10 lg:border-y'>
            {count}
          </p>
          <button
            type='button'
            className='h-10 w-10 bg-cloud px-3 text-center font-bold text-navy'
            onClick={handleAdd}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};
