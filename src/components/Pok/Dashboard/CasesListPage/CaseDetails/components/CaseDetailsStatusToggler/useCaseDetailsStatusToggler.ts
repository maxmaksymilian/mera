import useTranslation from 'next-translate/useTranslation';

import { useAppStore } from '@/lib';
import { useApiMutation } from '@/hooks/api/useApiMutation';

import { useForm } from '@/components/commons/Form/useForm';

type UseCaseDetailsStatusTogglerProps = {
  status: string;
  userId: string;
  caseId: string;
  refetch: () => void;
};

export const useCaseDetailsStatusToggler = ({
  status,
  userId,
  caseId,
  refetch,
}: UseCaseDetailsStatusTogglerProps) => {
  const { t } = useTranslation('common');
  const { token } = useAppStore();
  const { isLoading, mutate } = useApiMutation({
    route: 'CHANGE_CASE_STATUS',
    method: 'POST',
    params: {
      userId,
      caseId,
    },
  });

  const form = useForm({
    initialValues: {
      status,
    },
    onSubmit: async (values) => {
      mutate(
        { ...values, token },
        {
          onSuccess: ({ error }) => (error ? null : refetch()),
        }
      );
    },
  });

  return { form, isLoading, mutate, t };
};
