import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import { useAppStore } from '@/lib';
import { useApiMutation } from '@/hooks/api/useApiMutation';

import { useForm } from '@/components/commons/Form/useForm';

import { CaseDetailsGeneralInfoProps } from './CaseDetailsGeneralInfo';

export const useCaseDetailsGeneralInfo = ({
  userId,
  caseId,
  refetch,
}: Pick<CaseDetailsGeneralInfoProps, 'userId' | 'caseId' | 'refetch'>) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { t } = useTranslation('common');
  const { token } = useAppStore();
  const { isLoading, mutate } = useApiMutation({
    route: 'EDIT_CASE_DATA',
    method: 'PUT',
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

  return { form, isLoading, isModalOpen, setIsModalOpen, t };
};
