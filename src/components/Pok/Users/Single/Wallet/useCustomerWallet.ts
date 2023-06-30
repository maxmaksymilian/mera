import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import { useApiQuery } from '@/hooks/api/useApiQuery';

type UseCustomerWalletProps = {
  id: string;
};

export const useCustomerWallet = ({ id }: UseCustomerWalletProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation('common');
  const { data, status, refetch } = useApiQuery({
    route: 'POK_CUSTOMER_WALLET',
    params: { id },
  });

  const handleRefresh = () => {
    refetch();
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return {
    data,
    status,
    isOpen,
    handleClose,
    handleRefresh,
    refetch,
    setIsOpen,
    t,
  };
};
