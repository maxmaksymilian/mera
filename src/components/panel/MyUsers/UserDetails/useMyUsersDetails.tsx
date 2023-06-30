import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import { useApiQuery } from '@/hooks/api/useApiQuery';

import { modals } from './MyUsersDetailsModel';

type UseMyUsersDetailsProps = {
  id: string;
};

export const useMyUsersDetails = ({ id }: UseMyUsersDetailsProps) => {
  const { t } = useTranslation('common');
  const { data, status, isLoading, refetch } = useApiQuery({
    route: 'PROFILE_MY_USERS',
    id,
  });

  const [isOpen, setIsModalOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<keyof typeof modals>('wallet');

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleModalOpen = (variant: keyof typeof modals) => {
    setIsModalOpen(true);
    setActiveModal(variant);
  };

  const handleRefresh = () => {
    refetch();
  };

  return {
    activeModal,
    data,
    isLoading,
    isOpen,
    status,
    handleClose,
    handleRefresh,
    handleModalOpen,
    t,
  };
};
