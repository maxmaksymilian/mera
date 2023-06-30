import useTranslation from 'next-translate/useTranslation';

import { Button } from '@/components/commons/Button';
import { Skeleton } from '@/components/commons/Skeleton/Skeleton';

import { HistorySection } from './components/HistorySection';

type WalletProps = {
  data: any;
  status: string;
  handleOpenModal: () => void;
  refetch?: () => void;
};

export const Wallet = ({ status, data, handleOpenModal }: WalletProps) => {
  const { t } = useTranslation('common');

  return (
    <div>
      <div>
        <div className='flex justify-between md:block md:pb-10'>
          <p className='text-base leading-6 text-gray'>
            {t('panel.wallet.personalBalance')}
          </p>
          <p className='font-bold md:text-lg md:leading-lg'>
            {status === 'success'
              ? t('panel.wallet.personalBalancePoints', {
                  points: data?.points || 0,
                })
              : ''}
          </p>
        </div>
        <Button
          className='my-5 md:hidden'
          handleClick={handleOpenModal}
          fullWidth
        >
          {t('reachargeAcc')}
        </Button>
      </div>
      <h1 className='my-2.5 text-md leading-8 text-black md:text-base md:font-normal'>
        {t('transactionHistory')}:
      </h1>
      {status === 'success' ? (
        <HistorySection historyItems={data?.wallet_history || []} />
      ) : (
        <Skeleton count={3} />
      )}
    </div>
  );
};
