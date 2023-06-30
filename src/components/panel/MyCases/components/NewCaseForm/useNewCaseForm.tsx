import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { useEffect } from 'react';

import { useApiMutation } from '@/hooks/api/useApiMutation';

import { useForm } from '@/components/commons/Form/useForm';

import { NewCaseFormProps } from './NewCaseForm';
import {
  customerServiceInitialValues,
  customerServiceNewCaseValidationSchema,
  initialValues,
  newCaseValidationSchema,
} from './NewCaseFormModel';

export const useNewCaseForm = ({
  handleClose,
  handleReload,
  isCustomerService,
}: NewCaseFormProps) => {
  const { t } = useTranslation('common');
  const router = useRouter();

  const form = useForm({
    initialValues: isCustomerService
      ? customerServiceInitialValues
      : initialValues,
    validationSchema: isCustomerService
      ? customerServiceNewCaseValidationSchema
      : newCaseValidationSchema,
    onSubmit: async (values) => {
      mutate(values, {
        onSuccess: ({ error }) => {
          if (!error) {
            handleClose();
            handleReload();
          }
        },
      });
    },
  });

  const { mutate, isLoading, error } = useApiMutation({
    route: isCustomerService ? 'POK_NEW_CASE' : 'PROFILE_MY_CASES',
    method: 'POST',
    params: isCustomerService
      ? {
          userId: form.values.client,
        }
      : undefined,
  });

  useEffect(() => {
    form.setFieldValue('client', router.query?.userId || '');
    form.setFieldValue('transaction', router.query?.transactionId || '');
  }, []);

  return { t, form, error, isLoading };
};
