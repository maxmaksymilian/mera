import useTranslation from 'next-translate/useTranslation';
import { useLayoutEffect, useRef, useState } from 'react';

import { useAppStore } from '@/lib';
import { useApiMutation } from '@/hooks/api/useApiMutation';
import { useApiQuery } from '@/hooks/api/useApiQuery';

export const useCaseDetails = ({
  id,
  userId,
}: {
  id: string;
  userId: string;
}) => {
  const { t } = useTranslation('common');
  const { token } = useAppStore();
  const { data, status, refetch } = useApiQuery({
    route: 'POK_CASES',
    params: { userId: userId, caseId: id },
  });
  const conversationRef = useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // TODO: CHANGE API ENDPOINT
  const { mutate } = useApiMutation({
    route: 'PROFILE_MY_CASES_RESUME',
    method: 'PUT',
    params: {
      id,
    },
  });

  const handleSubmit = () => {
    mutate(
      { id },
      {
        onSuccess: () => {
          setIsOpen(false);
          refetch();
        },
      }
    );
  };

  useLayoutEffect(() => {
    const scrollHeight = conversationRef.current?.scrollHeight;
    conversationRef.current?.scrollTo({ top: scrollHeight });
  }, [conversationRef, status]);

  return {
    conversationRef,
    data,
    isOpen,
    status,
    token,
    handleSubmit,
    setIsOpen,
    refetch,
    t,
  };
};
