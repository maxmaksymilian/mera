import { useApiMutation } from '@/hooks/api/useApiMutation';

import { useForm } from '@/components/commons/Form/useForm';

import {
  EditModalType,
  myUsersEditValidationSchema as validationSchema,
} from './EditModalModel';

export const useEditModal = ({
  values,
  id,
  handleClose,
  handleRefresh,
}: EditModalType) => {
  const { mutate, isLoading, error } = useApiMutation({
    route: 'PROFILE_MY_USERS_UPDATE',
    method: 'PUT',
    params: { id },
  });

  const form = useForm({
    initialValues: { ...values },
    validationSchema,
    onSubmit: async (values) => {
      mutate(values, {
        onSuccess: ({ error }) => {
          if (!error) {
            handleRefresh();
            handleClose();
          }
        },
      });
    },
  });

  return { form, error, isLoading };
};
