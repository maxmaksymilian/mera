import useTranslation from 'next-translate/useTranslation';

import { changeDiscountFormValidation as validationSchema } from '@/lib/validationSchema/mydata';
import { useApiMutation } from '@/hooks/api/useApiMutation';

import { useForm } from '@/components/commons/Form/useForm';

type UseChangeDiscountFormProps = {
  handleClose: () => void;
  handleRefresh: () => void;
};

export const useChangeDiscountForm = ({
  handleClose,
  handleRefresh,
}: UseChangeDiscountFormProps) => {
  const { t } = useTranslation('common');
  const { error, isLoading, mutate } = useApiMutation({
    route: 'PROFILE_DISCOUNT',
    method: 'POST',
  });

  const form = useForm({
    initialValues: {
      discount: '',
      front: null,
      back: null,
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

  return { error, form, isLoading, t };
};
