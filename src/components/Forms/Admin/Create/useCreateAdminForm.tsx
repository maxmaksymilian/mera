import { useApiMutation } from '@/hooks/api/useApiMutation';
import { useApiQuery } from '@/hooks/api/useApiQuery';

import { useForm } from '@/components/commons/Form/useForm';
import { FormProps } from '@/components/Forms/@types/Form';

import {
  adminCreateValidationSchema as validationSchema,
  initialValues,
} from './CreateAdminFormModel';

export const useCreateAdminForm = ({
  handleSubmit,
  oldValues,
  ...props
}: FormProps) => {
  const { mutate, isLoading, error } = useApiMutation(props);
  const { data } = useApiQuery({
    route: 'POK_ROLES',
  });

  const roles: { id: string; name: string }[] = data ? data : [];

  const form = useForm({
    initialValues: oldValues
      ? { ...initialValues, ...oldValues }
      : initialValues,
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

  return { form, error, isLoading, roles };
};
