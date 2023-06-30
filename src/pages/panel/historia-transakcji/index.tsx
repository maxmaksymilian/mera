import dynamic from 'next/dynamic';
import useTranslation from 'next-translate/useTranslation';

import { Layout } from '@/components/Layouts/Panel/Layout';

const DynamicTransactionHistory = dynamic(
  () =>
    import('@/components/panel/TransactionHistory/TransactionHistory').then(
      (m) => m.TransactionHistory
    ),
  {
    ssr: false,
  }
);

const TransactionHistory = () => {
  const { t } = useTranslation('common');
  return (
    <Layout
      {...{
        variant: 'client',
        title: t('panel.transactionHistory.transactionHistory'),
        subTitle: t('panel.transactionHistory.transactionHistorySubHeadline'),
      }}
    >
      <DynamicTransactionHistory />
    </Layout>
  );
};

export default TransactionHistory;
