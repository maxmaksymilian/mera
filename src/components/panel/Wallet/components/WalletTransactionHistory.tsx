import useTranslation from 'next-translate/useTranslation';

import WalletStatus from './WalletStatus';

export type WalletTransactionHistoryProps = {
  action: string;
  transaction_number: number;
  id: string;
  creation_date: string;
  current_balance_points: number;
  current_balance_price: number;
  points_transfer: number;
  before_balance_price: number;
  before_balance_points: number;
  created_at?: string;
  status: 'completed' | 'new' | 'failed';
};

export const WalletTransactionHistory = ({
  action,
  transaction_number,
  creation_date,
  current_balance_points,
  current_balance_price,
  points_transfer,
  created_at,
  status,
}: WalletTransactionHistoryProps) => {
  const { t } = useTranslation('common');
  return (
    <div className='my-10 flex gap-5'>
      <div className='progress relative'>
        <span className='line absolute left-1/2 z-0 h-full w-px -translate-x-1/2 bg-cloud' />
        <WalletStatus {...{ status }} />
      </div>
      <div className='content md:w-full md:max-w-3xl'>
        <div className='md:flex md:items-start md:justify-between md:gap-2.5'>
          <div className='md:flex md:items-center md:gap-2.5'>
            <h5 className='text-sm font-bold leading-6 text-black'>
              {action === 'recharge_account'
                ? t(`panel.wallet.${status}`)
                : t('panel.wallet.substractFunds')}
            </h5>
            <p className='py-1 text-sm leading-6 text-navy md:p-0 md:font-bold'>
              ({t('panel.wallet.transaction')} #{transaction_number})
            </p>
          </div>
          <p className='py-1 text-sm leading-6 text-gray md:py-0'>
            {created_at ? created_at : creation_date}
          </p>
        </div>
        <div className='md:flex md:items-center md:gap-20 md:pt-5'>
          <p className='py-1 text-sm leading-6 text-gray'>
            {action === 'recharge_account' ? '+' : '-'}
            &nbsp;{points_transfer} {t('panel.wallet.points')} ({' '}
            {points_transfer} {t('currencyLabel')} )
          </p>
          <span className='text-sm leading-6 text-gray'>{'->'}</span>
          <p className='pt-1 text-base leading-6'>
            {t('panel.wallet.balance')}:{' '}
            {status === 'completed'
              ? current_balance_points + points_transfer
              : current_balance_points}{' '}
            {t('panel.wallet.points')} (&nbsp;
            {status === 'completed'
              ? current_balance_price + points_transfer
              : current_balance_points}{' '}
            {t('currencyLabel')} )
          </p>
        </div>
      </div>
    </div>
  );
};
