import useTranslation from 'next-translate/useTranslation';

import { useApiMutation } from '@/hooks/api/useApiMutation';

import { useForm } from '@/components/commons/Form/useForm';

import { RefundCaseFormProps } from './RefundCaseForm';
import {
  initialValues,
  refundCaseValidationSchema as validationSchema,
} from './RefundCaseFormModel';

export const useRefundCaseForm = ({
  handleClose,
  handleReload,
}: RefundCaseFormProps) => {
  const { t } = useTranslation('common');
  const { mutate, isLoading, error } = useApiMutation({
    route: 'PROFILE_MY_CASES_REFUND',
    method: 'POST',
  });

  const form = useForm({
    initialValues,
    validationSchema,
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

  return { t, form, error, isLoading };
};
