import { changePasswordFormValidation as validationSchema } from '@/lib';
import { useApiMutation } from '@/hooks/api/useApiMutation';

import { useForm } from '@/components/commons/Form/useForm';

type UseChangePasswordForm = {
  handleClose: () => void;
};

export const useChangePasswordForm = ({
  handleClose,
}: UseChangePasswordForm) => {
  const { error, isLoading, mutate } = useApiMutation({
    route: 'PROFILE_MY_DATA_CHANGE_PASSWORD',
    method: 'PUT',
  });
  const form = useForm({
    initialValues: {
      current_password: '',
      password: '',
      password_confirmation: '',
    },
    validationSchema,
    onSubmit: (values) => {
      mutate(
        { ...values },
        {
          onSuccess: ({ error }) => {
            if (error) {
              return null;
            }
            handleClose();
          },
        }
      );
    },
  });

  return { error, form, isLoading, mutate };
};
