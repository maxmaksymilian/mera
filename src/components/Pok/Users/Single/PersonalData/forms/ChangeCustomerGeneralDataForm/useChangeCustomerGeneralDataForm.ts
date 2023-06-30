import useTranslation from 'next-translate/useTranslation';

import { changeGeneralDataValidation as validationSchema } from '@/lib/validationSchema/mydata';
import { useApiMutation } from '@/hooks/api/useApiMutation';

import { useForm } from '@/components/commons/Form/useForm';
import { ProfileType } from '@/components/panel/MyData/MyDataPageContent';

type UseChangeCustomerGeneralDataFormProps = {
  id: string;
  profile: ProfileType;
  handleClose: () => void;
  handleRefresh: () => void;
};

export const useChangeCustomerGeneralDataForm = ({
  id,
  profile,
  handleClose,
  handleRefresh,
}: UseChangeCustomerGeneralDataFormProps) => {
  const { t } = useTranslation('common');
  const { error, isLoading, mutate } = useApiMutation({
    route: 'POK_UPDATE_CUSTOMER_GENERAL_DATA',
    method: 'PUT',
    params: {
      id,
    },
  });

  const form = useForm({
    initialValues: {
      first_name: profile.first_name,
      last_name: profile.last_name,
      pesel: profile.pesel,
      email: profile.email,
      telephone: profile.telephone.telephone,
      telephone_prefix: profile.telephone.prefix,
    },
    validationSchema,
    validateOnMount: false,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      mutate(
        { ...values },
        {
          onSuccess: ({ error }) => {
            if (error) {
              return null;
            }
            handleRefresh();
            handleClose();
          },
        }
      );
    },
  });

  return {
    error,
    form,
    isLoading,
    mutate,
    t,
  };
};
