import useTranslation from 'next-translate/useTranslation';

import { useApiMutation } from '@/hooks/api/useApiMutation';

type UseResetModalProps = {
  id: string;
};

export const useResetModal = ({ id }: UseResetModalProps) => {
  const { t } = useTranslation('common');
  const { mutate, isLoading } = useApiMutation({
    route: 'POK_ADMINS_RESET_PASSWORD',
    method: 'POST',
    params: {
      id,
    },
  });

  return { isLoading, mutate, t };
};
