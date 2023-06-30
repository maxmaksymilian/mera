import useTranslation from 'next-translate/useTranslation';

import { changeAddressDataValidation as validationSchema } from '@/lib/validationSchema/mydata';
import { useApiMutation } from '@/hooks/api/useApiMutation';

import { useForm } from '@/components/commons/Form/useForm';
import { AddressType } from '@/components/Pok/Users/Single/PersonalData/PersonalData';

type UseChangeCustomerAddressRegisteredFormProps = {
  id: string;
  address: AddressType;
  handleRefresh: () => void;
  handleClose: () => void;
};

export const useChangeCustomerAddressRegisteredForm = ({
  id,
  address,
  handleClose,
  handleRefresh,
}: UseChangeCustomerAddressRegisteredFormProps) => {
  const { t } = useTranslation('common');
  const { error, isLoading, mutate } = useApiMutation({
    route: 'POK_UPDATE_CUSTOMER_REGISTERED_ADDRESS',
    method: 'PUT',
    params: {
      id,
    },
  });

  const form = useForm({
    initialValues: {
      street: address?.street || '',
      number: address?.number || '',
      apt_number: address?.apt_number || '',
      zip: address?.zip || '',
      city: address?.city || '',
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
