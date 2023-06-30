import useTranslation from 'next-translate/useTranslation';

import { changeDocumentFormValidation as validationSchema } from '@/lib/validationSchema/mydata';
import { useApiMutation } from '@/hooks/api/useApiMutation';

import { useForm } from '@/components/commons/Form/useForm';
import { DocumentType } from '@/components/panel/MyData/MyDataPageContent';

type UseChangeDocumentFormProps = {
  document: DocumentType;
  handleClose: () => void;
  handleRefresh: () => void;
};

export const useChangeDocumentForm = ({
  document,
  handleClose,
  handleRefresh,
}: UseChangeDocumentFormProps) => {
  const { t } = useTranslation('common');
  const { error, isLoading, mutate } = useApiMutation({
    route: 'PROFILE_MY_DATA',
    method: 'PUT',
  });

  const form = useForm({
    initialValues: {
      type: document?.type,
      number: document?.number,
      expiration_date: document?.expiration_date,
      verified_at: document?.verified_at,
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
