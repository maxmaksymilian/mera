import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import { useApiQuery } from '@/hooks/api/useApiQuery';

import { CustomerDataPageProps, ModalDescType } from './PersonalData';
import { modalCustomerDesc } from './PersonalDataModel';

export const useCustomerData = ({ id, openModal }: CustomerDataPageProps) => {
  const { t } = useTranslation('common');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(openModal);
  const [modalData, setModalData] = useState<ModalDescType>(
    openModal
      ? modalCustomerDesc.addressResidential
      : modalCustomerDesc.password
  );

  const { data, status, refetch } = useApiQuery({
    route: 'POK_CUSTOMER_DATA',
    params: { id },
  });

  return {
    data,
    status,
    isModalOpen,
    modalData,
    t,
    refetch,
    setIsModalOpen,
    setModalData,
  };
};
