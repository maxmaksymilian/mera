import { useApiMutation } from '@/hooks/api/useApiMutation';

import { useForm } from '@/components/commons/Form/useForm';
import { FormProps } from '@/components/Forms/@types/Form';

import {
  initialValues,
  resetPasswordValidationSchema as validationSchema,
} from './ResetPasswordFormModel';

export const useResetPasswordForm = ({ handleSubmit, ...props }: FormProps) => {
  const { mutate, isLoading, error } = useApiMutation(props);

  const form = useForm({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      mutate(values, {
        onSuccess: ({ error }) => (error ? null : handleSubmit()),
      });
    },
  });

  return { form, error, isLoading };
};
