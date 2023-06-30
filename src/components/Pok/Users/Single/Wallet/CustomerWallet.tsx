import { Button } from '@/components/commons/Button';
import { Modal } from '@/components/commons/Modal/Modal';
import { Skeleton } from '@/components/commons/Skeleton/Skeleton';
import { HistorySection } from '@/components/panel/Wallet/components/HistorySection';

import { CustomerWalletForm } from './components/CustomerWalletForm';
import { useCustomerWallet } from './useCustomerWallet';

type CustomerWalletProps = {
  id: string;
};

export const CustomerWallet = ({ id }: CustomerWalletProps) => {
  const { data, status, isOpen, handleClose, handleRefresh, setIsOpen, t } =
    useCustomerWallet({
      id,
    });

  return (
    <>
      <div>
        <div className='pb-10'>
          <Button
            handleClick={() => setIsOpen(true)}
            className='w-full md:w-auto'
          >
            {t('reachargeAcc')}
          </Button>
        </div>
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
            handleClick={() => setIsOpen(true)}
            fullWidth
          >
            {t('reachargeAcc')}
          </Button>
        </div>
        <h1 className='my-2.5 text-md leading-8 text-black md:text-base md:font-normal'>
          {t('transactionHistory')}:
        </h1>
        {status === 'success' ? (
          <HistorySection historyItems={data?.wallet_history} />
        ) : (
          <Skeleton count={3} />
        )}
      </div>
      <Modal {...{ isOpen, handleClose }}>
        <CustomerWalletForm
          {...{ id, points: data?.points, handleClose, handleRefresh }}
        />
      </Modal>
    </>
  );
};
