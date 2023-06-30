import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

import { useApiMutation } from '@/hooks/api/useApiMutation';

import { useForm } from '@/components/commons/Form/useForm';

import {
  initialValues,
  walletFormValidation as validationSchema,
} from './WalletModalContentFormModel';

export const useWalletModalContentForm = () => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const { mutate, error, isLoading } = useApiMutation({
    route: 'PROFILE_RECHARGE_WALLET',
    method: 'POST',
  });

  const form = useForm({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      mutate(values, {
        onSuccess: ({ error, data }) => {
          if (error) {
            return null;
          } else {
            router.push(data);
          }
        },
      });
    },
  });

  return { form, error, isLoading, t };
};
