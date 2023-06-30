import useTranslation from 'next-translate/useTranslation';

import { useApiMutation } from '@/hooks/api/useApiMutation';

import { useForm } from '@/components/commons/Form/useForm';
import { initialValues } from '@/components/Pok/Users/Single/PersonalData/PersonalDataModel';

type UseChangeCustomerStatusFormProps = {
  id: string;
  handleClose: () => void;
  handleRefresh: () => void;
};

export const useChangeCustomerStatusForm = ({
  id,
  handleClose,
  handleRefresh,
}: UseChangeCustomerStatusFormProps) => {
  const { t } = useTranslation('common');
  const { mutate, error, isLoading } = useApiMutation({
    method: 'PUT',
    route: 'POK_UPDATE_CUSTOMER_STATUS',
    params: {
      id,
    },
  });
  const form = useForm({
    initialValues,
    onSubmit: (values) => {
      mutate(
        { ...values },
        {
          onSuccess: ({ error }) => {
            if (error) {
              return null;
            }
            handleClose();
            handleRefresh();
          },
        }
      );
    },
  });

  return {
    error,
    isLoading,
    form,
    t,
  };
};
