import { useRouter } from 'next/router';

import { useApiMutation } from '@/hooks/api/useApiMutation';

import { useForm } from '@/components/commons/Form/useForm';
import { FormProps } from '@/components/Forms/@types/Form';

import {
  initialValues,
  loginValidationSchema as validationSchema,
} from './LoginFormModel';

export const useLoginForm = ({ handleSubmit, ...props }: FormProps) => {
  const router = useRouter();
  const { mutate, isLoading, error } = useApiMutation(props);

  const form = useForm({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      mutate(values, {
        onSuccess: ({ reset_token, error, data }) => {
          if (reset_token) {
            return router.push(
              `/auth/aktualizacja-hasla?email=${values.email}&token=${reset_token}`
            );
          }
          error ? null : handleSubmit({ data, values });
        },
      });
    },
  });

  return { form, error, isLoading };
};
