import useTranslation from 'next-translate/useTranslation';

import { useApiMutation } from '@/hooks/api/useApiMutation';

import { useForm } from '@/components/commons/Form/useForm';

import {
  initialValues,
  walletFormValidation as validationSchema,
} from './WalletModalContentFormModel';

type UseWalletModalContentFormProps = {
  id: string;
  handleRefresh: () => void;
  handleClose: () => void;
};

export const useWalletModalContentForm = ({
  id,
  handleClose,
  handleRefresh,
}: UseWalletModalContentFormProps) => {
  const { t } = useTranslation('common');
  const { mutate, error, isLoading } = useApiMutation({
    route: 'PROFILE_USER_RECHARGE_WALLET',
    method: 'POST',
    params: {
      id,
    },
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
            handleClose();
            handleRefresh();
          }
        },
      });
    },
  });

  return { form, error, isLoading, t };
};
