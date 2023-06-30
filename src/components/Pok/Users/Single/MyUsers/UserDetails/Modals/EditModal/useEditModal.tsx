import { useApiMutation } from '@/hooks/api/useApiMutation';

import { useForm } from '@/components/commons/Form/useForm';

import {
  EditModalType,
  myUsersEditValidationSchema as validationSchema,
} from './EditModalModel';

export const useEditModal = ({
  values,
  id,
  userid,
  handleClose,
  handleReload,
}: EditModalType) => {
  const { mutate, isLoading, error } = useApiMutation({
    route: 'POK_PROFILE_MY_USERS_UPDATE',
    method: 'PUT',
    params: { id, userid },
  });

  const form = useForm({
    initialValues: { ...values },
    validationSchema,
    onSubmit: async (values) => {
      mutate(values, {
        onSuccess: ({ error }) => {
          if (!error) {
            handleReload();
            handleClose();
          }
        },
      });
    },
  });

  return { form, error, isLoading };
};
