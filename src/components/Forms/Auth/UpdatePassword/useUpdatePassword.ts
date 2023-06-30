import { useApiMutation } from '@/hooks/api/useApiMutation';

import { useForm } from '@/components/commons/Form/useForm';

import { UpdatePasswordFormType } from './UpdatePasswordForm';
import {
  initialValues,
  updatePasswordValidationSchema as validationSchema,
} from './UpdatePasswordFormModel';

export const useUpdatePasswordForm = ({
  token,
  email,
  handleSubmit,
  ...props
}: UpdatePasswordFormType) => {
  const { mutate, isLoading, error } = useApiMutation(props);

  const form = useForm({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      mutate(
        { ...values, token, email },
        {
          onSuccess: ({ error }) => (error ? null : handleSubmit({ values })),
        }
      );
    },
  });

  return { form, error, isLoading };
};
