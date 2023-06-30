import useTranslation from 'next-translate/useTranslation';
import { useLayoutEffect, useRef, useState } from 'react';

import { useAppStore } from '@/lib';
import { useApiMutation } from '@/hooks/api/useApiMutation';
import { useApiQuery } from '@/hooks/api/useApiQuery';
import { useScreen } from '@/hooks/useScreen';

export const useCaseDetails = ({ id }: { id: string }) => {
  const { t } = useTranslation('common');
  const { isMdUp } = useScreen();
  const { token } = useAppStore();
  const { data, status, refetch } = useApiQuery({
    route: 'PROFILE_MY_CASES',
    id,
  });
  const conversationRef = useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
    isMdUp,
    status,
    token,
    handleSubmit,
    setIsOpen,
    refetch,
    t,
  };
};
