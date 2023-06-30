import useTranslation from 'next-translate/useTranslation';

import { Icon } from '@/components/commons/Icon/Icon';

export type TicketBarProps = {
  name: string;
  price?: number;
  desc?: string;
  amount?: number;
};

export const TicketBar = ({ name, price, desc, amount }: TicketBarProps) => {
  const { t } = useTranslation('events');
  return (
    <div className='mb-2.5 flex gap-5 md:w-fit'>
      <div>
        <Icon name='ticket' className='h-11 w-11' />
      </div>
      <div>
        <div className='w-full justify-between md:flex'>
          <p className='text-sm font-bold leading-6 text-black md:text-base'>
            {name} &nbsp; {amount ? `(${amount}x)` : ''}
          </p>
          {price ? (
            <p className='hidden pb-2.5 text-base font-bold leading-6 text-navy md:block'>
              {price} {t('events.buyTicketSection.pricePerPersonLabel')}
            </p>
          ) : null}
        </div>
        <p className='py-1.5 text-sm text-gray md:py-0 md:leading-6'>
          {desc
            ? desc
            : 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis.'}
        </p>
        {price ? (
          <p className='pb-2.5 text-base font-bold leading-6 text-navy md:hidden'>
            {price} {t('events.buyTicketSection.pricePerPersonLabel')}
          </p>
        ) : null}
      </div>
    </div>
  );
};
