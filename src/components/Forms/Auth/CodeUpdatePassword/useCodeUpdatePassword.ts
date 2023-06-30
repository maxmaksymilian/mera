import { useApiMutation } from '@/hooks/api/useApiMutation';

import { useForm } from '@/components/commons/Form/useForm';

import { CodeUpdatePasswordFormType } from './CodeUpdatePasswordForm';
import {
  codeUpdatePasswordValidationSchema as validationSchema,
  initialValues,
} from './CodeUpdatePasswordFormModel';

export const useUpdatePasswordForm = ({
  token,
  email,
  password,
  password_confirmation,
  handleSubmit,
  ...props
}: CodeUpdatePasswordFormType) => {
  const { mutate, isLoading, error } = useApiMutation(props);

  const form = useForm({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      mutate(
        { ...values, token, email, password, password_confirmation },
        {
          onSuccess: ({ error }) => (error ? null : handleSubmit()),
        }
      );
    },
  });

  return { form, error, isLoading };
};
