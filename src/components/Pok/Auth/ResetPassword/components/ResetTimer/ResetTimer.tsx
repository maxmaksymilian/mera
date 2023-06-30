import useTranslation from 'next-translate/useTranslation';

import { Link } from '@/components/commons/Link';

import { useResetTimer } from './useResetTimer';

export type ResetTimerProps = {
  isSubmited: boolean;
};

export const ResetTimer = (props: ResetTimerProps) => {
  const { t } = useTranslation('common');
  const { hours, minutes, seconds } = useResetTimer({ ...props });

  return (
    <>
      <p className='text-gray'>
        {t('auth.resetPassword.info')}
        <span className='text-navy'>
          {` ${(minutes + hours * 60).toString().padStart(2, '0')} min ${seconds
            .toString()
            .padStart(2, '0')} sek. `}
        </span>
        {t('auth.resetPassword.linkClick')}
      </p>
      <Link href='/pok/auth/logowanie'>
        <p className='cursor-pointer text-left text-navy'>
          {t('auth.resetPassword.backToLogin')}
        </p>
      </Link>
    </>
  );
};
