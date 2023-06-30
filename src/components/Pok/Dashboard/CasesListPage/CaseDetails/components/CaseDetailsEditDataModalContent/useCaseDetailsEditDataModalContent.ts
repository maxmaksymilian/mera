import useTranslation from 'next-translate/useTranslation';

import { editCaseValidation as validationSchema } from '@/lib';
import { useApiMutation } from '@/hooks/api/useApiMutation';

import { useForm } from '@/components/commons/Form/useForm';

import { CaseDetailsEditDataModalContentProps } from './CaseDetailsEditDataModalContent';

export const useCaseDetailsEditDataModalContent = ({
  caseId,
  userId,
  employee,
  type,
  handleClose,
  handleRefresh,
}: CaseDetailsEditDataModalContentProps) => {
  const { t } = useTranslation('common');
  const { error, isLoading, mutate } = useApiMutation({
    route: 'EDIT_CASE_DATA',
    method: 'PUT',
    params: {
      caseId,
      userId,
    },
  });

  const form = useForm({
    initialValues: {
      type: type,
      guardian: employee ? employee.id : '',
      transaction: '',
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

  return { form, error, isLoading, t, mutate };
};
