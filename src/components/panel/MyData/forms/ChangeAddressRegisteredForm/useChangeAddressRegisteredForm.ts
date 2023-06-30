import useTranslation from 'next-translate/useTranslation';

import { changeAddressDataValidation as validationSchema } from '@/lib/validationSchema/mydata';
import { useApiMutation } from '@/hooks/api/useApiMutation';

import { useForm } from '@/components/commons/Form/useForm';
import { AddressType } from '@/components/Pok/Users/Single/PersonalData/PersonalData';

type UseChangeAddressRegisteredFormProps = {
  address: AddressType;
  handleRefresh: () => void;
  handleClose: () => void;
};

export const useChangeAddressRegisteredForm = ({
  address,
  handleClose,
  handleRefresh,
}: UseChangeAddressRegisteredFormProps) => {
  const { t } = useTranslation('common');
  const { error, isLoading, mutate } = useApiMutation({
    route: 'PROFILE_MY_DATA_ADDRESS_REGISTERED_UPDATE',
    method: 'PUT',
  });

  const form = useForm({
    initialValues: {
      street: address.street,
      number: address.number,
      apt_number: address.apt_number,
      zip: address.zip,
      city: address.city,
    },
    validationSchema,
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
    form,
    error,
    isLoading,
    mutate,
    t,
  };
};
