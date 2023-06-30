import useTranslation from 'next-translate/useTranslation';

import { useApiMutation } from '@/hooks/api/useApiMutation';

type UseCustomerTicketBlockModalProps = {
  id: string;
  userId: string;
};

export const useCustomerTicketBlockModal = ({
  id,
  userId,
}: UseCustomerTicketBlockModalProps) => {
  const { t } = useTranslation('common');
  const { mutate, isLoading } = useApiMutation({
    route: 'CUSTOMER_TICKETS_LOCK',
    method: 'POST',
    params: {
      id: userId,
      ticketId: id,
    },
  });

  return { isLoading, mutate, t };
};
