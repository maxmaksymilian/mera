import useTranslation from 'next-translate/useTranslation';

import { useApiMutation } from '@/hooks/api/useApiMutation';

import { useForm } from '@/components/commons/Form/useForm';

import { ResetPasswordFormProps } from './ResetPasswordForm';

export const useResetPasswordForm = ({
  id,
  handleClose,
  handleRefresh,
}: ResetPasswordFormProps) => {
  const { t } = useTranslation('common');
  const { error, isLoading, mutate } = useApiMutation({
    route: 'POK_RESET_PASSWORD',
    method: 'POST',
    params: {
      id,
    },
  });

  const form = useForm({
    initialValues: {
      isSent: false,
    },
    onSubmit: () => {
      mutate(
        {},
        {
          onSuccess: ({ error }) => {
            if (error) {
              return null;
            }
            handleRefresh();
            handleClose();
          },
        }
      );
    },
  });

  return { form, error, isLoading, mutate, t };
};
