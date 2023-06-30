import { useApiMutation } from '@/hooks/api/useApiMutation';

import { useForm } from '@/components/commons/Form/useForm';
import { FormProps } from '@/components/Forms/@types/Form';

import {
  initialValues,
  registerValidationSchema as validationSchema,
} from './RegisterFormModel';

export const useRegisterForm = ({ handleSubmit, ...props }: FormProps) => {
  const { mutate, isLoading, errors } = useApiMutation(props);

  const form = useForm({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      mutate(values, {
        onSuccess: ({ error }) => (error ? null : handleSubmit()),
      });
    },
  });

  return { form, errors, isLoading };
};
