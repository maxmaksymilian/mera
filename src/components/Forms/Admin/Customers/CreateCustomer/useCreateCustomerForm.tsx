import { useApiMutation } from '@/hooks/api/useApiMutation';

import { useForm } from '@/components/commons/Form/useForm';
import { FormProps } from '@/components/Forms/@types/Form';

import {
  customerCreateValidationSchema as validationSchema,
  initialValues,
} from './CreateCustomerFormModel';

export const useCreateCustomerForm = ({
  handleSubmit,
  ...props
}: FormProps) => {
  const { mutate, isLoading, error } = useApiMutation(props);

  const form = useForm({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      mutate(values, {
        onSuccess: ({ error, data }) => {
          if (!error) {
            handleSubmit({ data });
          }
        },
      });
    },
  });

  return { form, error, isLoading };
};
