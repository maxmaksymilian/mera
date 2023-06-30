import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

import { useApiMutation } from '@/hooks/api/useApiMutation';

import { useForm } from '@/components/commons/Form/useForm';

import {
  initialValues,
  walletFormValidation as validationSchema,
} from './WalletModalContentFormModel';

type UseWalletModalContentFormProps = {
  handleRefresh: () => void;
  handleClose: () => void;
};

export const useWalletModalContentForm = ({
  handleClose,
  handleRefresh,
}: UseWalletModalContentFormProps) => {
  const { query } = useRouter();
  const { t } = useTranslation('common');
  const { mutate, error, isLoading } = useApiMutation({
    route: 'POK_CUSTOMER_ALL_USERS_WALLET',
    method: 'POST',
    params: {
      id: typeof query.id === 'string' ? query.id : '',
      userId: typeof query.userid === 'string' ? query.userid : '',
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
            handleRefresh();
            handleClose();
          }
        },
      });
    },
  });

  return { form, error, isLoading, t };
};
