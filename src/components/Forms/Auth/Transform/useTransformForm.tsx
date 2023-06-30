import { useApiMutation } from '@/hooks/api/useApiMutation';

import { useForm } from '@/components/commons/Form/useForm';

import { TransformFormType } from './TransformForm';
import {
  initialValues,
  transformValidationSchema as validationSchema,
} from './TransformFormModel';

export const useTransformForm = ({
  token,
  handleSubmit,
  ...props
}: TransformFormType) => {
  const { mutate, isLoading, error } = useApiMutation(props);

  const form = useForm({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      mutate(
        { ...values, code: token },
        {
          onSuccess: ({ error }) => (error ? null : handleSubmit()),
        }
      );
    },
  });

  return { form, error, isLoading };
};
