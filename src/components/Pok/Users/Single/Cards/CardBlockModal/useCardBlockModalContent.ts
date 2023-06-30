import useTranslation from 'next-translate/useTranslation';

import { useApiMutation } from '@/hooks/api/useApiMutation';

type UseCardBlockModalContentProps = {
  id: string;
  userId: string;
};

export const useCardBlockModalContent = ({
  id,
  userId,
}: UseCardBlockModalContentProps) => {
  const { t } = useTranslation('common');
  const { mutate, isLoading } = useApiMutation({
    route: 'POK_CUSTOMER_CARD_LOCK',
    method: 'POST',
    params: {
      id: userId,
      cardId: id,
    },
  });

  return { isLoading, mutate, t };
};
