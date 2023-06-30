import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useTimer } from '@/hooks/useTimer';

import { ResetTimerProps } from './ResetTimer';

export const useResetTimer = ({ isSubmited }: ResetTimerProps) => {
  const { push, locale } = useRouter();
  const hoursMinSecs = { hours: 0, minutes: 15, seconds: 0 };
  const { hours, minutes, seconds } = useTimer({
    ...hoursMinSecs,
    isStoped: !isSubmited,
  });

  useEffect(() => {
    if (hours === 0 && minutes === 0 && seconds === 0 && isSubmited) {
      push('/pok/auth/logowanie', '/pok/auth/logowanie', { locale });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hours, minutes, seconds, isSubmited]);

  return { hours, minutes, seconds };
};
