import useTranslation from 'next-translate/useTranslation';

import { useApiQuery } from '@/hooks/api/useApiQuery';

import { Button } from '@/components/commons/Button';
import { Link } from '@/components/commons/Link';

import { List as ListCases } from './Cases/List';
import { List } from './Ticket/List';

export const Home = () => {
  const { data, status } = useApiQuery({
    route: 'PROFILE_DASHBOARD',
  });
  const { t } = useTranslation('common');

  return (
    <div className='flex flex-col gap-4 rounded-xs pb-5 md:flex-row md:gap-8'>
      <div className='rounded-xs border-y border-cloud py-4 px-0 sm:p-8 md:w-1/2 md:border md:py-5'>
        {status === 'success' && (
          <>
            <div className='flex justify-between'>
              <p className='text-base font-bold md:text-2xl'>
                {t('yourTickets')}
              </p>
              <Link href='/panel/moje-bilety'>
                <p className='hidden font-bold text-navy md:block'>
                  {t('seeAll')}
                </p>
              </Link>
            </div>
            <List tickets={data?.tickets || []} />
            <Link href='/panel/moje-bilety'>
              <p className='block pb-2 pt-8 text-center font-bold text-navy md:hidden md:py-8'>
                {t('seeAll')}
              </p>
            </Link>
            <div className='hidden pt-14 md:flex'>
              <Link href='/panel/moje-bilety/zamowienie'>
                <Button>{t('buttonBuyTicket')}</Button>
              </Link>
            </div>
          </>
        )}
      </div>
      {status === 'success' && (
        <div className='min-w-[50%] gap-8 lg:grid'>
          <div className='rounded-xs border-b border-cloud py-2 px-0 sm:p-8 md:border md:py-5'>
            <div className='flex'>
              <p className='inline-block text-base font-bold md:text-2xl'>
                {t('wallet')}
              </p>
            </div>
            {data?.wallet ? (
              <p className='mt-7 text-gray lg:mt-0'>
                {t('accBalance')}
                <em className='pl-5 font-bold text-black'>
                  {data.wallet.points} pkt ( {data.wallet.price} zł)
                </em>
              </p>
            ) : null}
            <div className='mb-16 mt-6 grid md:mb-0 lg:-mt-12 lg:flex lg:justify-end'>
              <Button>{t('reachargeAcc')}</Button>
            </div>
          </div>
          <ListCases items={data?.cases} />
        </div>
      )}
    </div>
  );
};
