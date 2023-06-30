import { useApiMutation } from '@/hooks/api/useApiMutation';

import { useForm } from '@/components/commons/Form/useForm';

import { CreateCardFormProps } from './CreateCardForm';
import {
  createCardValidationSchema as validationSchema,
  initialValues,
} from './CreateCardFormModel';

export const useCreateCardForm = ({
  handleClose,
  handleSubmit,
  oldValues,
  ...props
}: CreateCardFormProps) => {
  const { mutate, isLoading, errors } = useApiMutation(props);

  const form = useForm({
    initialValues: { ...initialValues, ...oldValues },
    validationSchema,
    onSubmit: async (values) => {
      mutate(values, {
        onSuccess: ({ error }) => {
          if (!error) {
            handleSubmit();
            handleClose();
          }
        },
      });
    },
  });

  return { form, errors, isLoading };
};
