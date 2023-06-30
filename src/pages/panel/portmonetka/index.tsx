import dynamic from 'next/dynamic';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import { useApiQuery } from '@/hooks/api/useApiQuery';

import { Modal } from '@/components/commons/Modal/Modal';
import { Layout } from '@/components/Layouts/Panel/Layout';
import { WalletModalContent } from '@/components/panel/Wallet/components/WalletModalContent/WalletModalContent';

const DynamicWallet = dynamic(
  () => import('@/components/panel/Wallet/Wallet').then((m) => m.Wallet),
  {
    ssr: false,
  }
);

const Wallet = () => {
  const { t } = useTranslation('common');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { status, data, refetch, isLoading } = useApiQuery({
    route: 'PROFILE_WALLET',
  });

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Layout
        {...{
          variant: 'client',
          title: t('panel.wallet.walletPageHeadline'),
          subTitle: t('panel.wallet.walletPageSubHeadline'),
          button: data?.wallet_history
            ? {
                handleClick: () => handleOpenModal(),
                children: t('reachargeAcc'),
              }
            : undefined,
          hideOnMobile: { subTitle: true, button: true },
        }}
      >
        <DynamicWallet
          {...{ data, status, refetch, isLoading, handleOpenModal }}
        />
      </Layout>
      <Modal {...{ handleClose, isOpen }}>
        <WalletModalContent points={data?.points || 0} />
      </Modal>
    </>
  );
};

export default Wallet;
