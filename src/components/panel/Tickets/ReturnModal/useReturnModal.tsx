import useTranslation from 'next-translate/useTranslation';

import { useApiMutation } from '@/hooks/api/useApiMutation';

type UseReturnModalProps = {
  id: string;
};

export const useReturnModal = ({ id }: UseReturnModalProps) => {
  const { t } = useTranslation('common');
  const { mutate, isLoading } = useApiMutation({
    route: 'CUSTOMER_TICKETS_LOCK',
    method: 'POST',
    params: {
      ticketId: id,
    },
  });

  return { isLoading, mutate, t };
};
