import useTranslation from 'next-translate/useTranslation';

import { useApiMutation } from '@/hooks/api/useApiMutation';

import { useForm } from '@/components/commons/Form/useForm';

import {
  initialValues,
  walletFormValidation as validationSchema,
} from './CustomerWalletFormModel';

type UseCustomerWalletForm = {
  id: string;
  handleClose: () => void;
  handleRefresh: () => void;
};

export const useCustomerWalletForm = ({
  id,
  handleClose,
  handleRefresh,
}: UseCustomerWalletForm) => {
  const { t } = useTranslation('common');
  const { error, isLoading, mutate } = useApiMutation({
    route: 'POK_RECHARGE_CUSTOMER_WALLET',
    method: 'POST',
    params: { id },
  });

  const form = useForm({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      mutate(values, {
        onSuccess: ({ error }) => {
          if (error) {
            return null;
          } else {
            handleRefresh();
            handleClose();
          }
        },
      });
    },
  });

  return { form, error, isLoading, t, mutate };
};
