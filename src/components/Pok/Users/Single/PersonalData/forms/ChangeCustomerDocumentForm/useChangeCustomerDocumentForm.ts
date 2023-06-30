import useTranslation from 'next-translate/useTranslation';

import { changeDiscountFormValidation as validationSchema } from '@/lib/validationSchema/mydata';
import { useApiMutation } from '@/hooks/api/useApiMutation';

import { useForm } from '@/components/commons/Form/useForm';

type UseChangeCustomerDocumentFormProps = {
  id: string;
  handleClose: () => void;
  handleRefresh: () => void;
};

export const useChangeCustomerDocumentForm = ({
  id,
  handleClose,
  handleRefresh,
}: UseChangeCustomerDocumentFormProps) => {
  const { t } = useTranslation('common');
  const { error, isLoading, mutate } = useApiMutation({
    route: 'POK_CREATE_CUSTOMER_DISCOUNTS',
    method: 'POST',
    params: {
      id,
    },
  });

  const form = useForm({
    initialValues: {
      discount: '',
      number: '',
      expiration_date: '',
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
