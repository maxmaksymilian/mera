import useTranslation from 'next-translate/useTranslation';

import { Link } from '@/components/commons/Link';
import { ResetPasswordForm } from '@/components/Forms/Auth/ResetPassword/ResetPasswordForm';

import { ResetTimer } from './components/ResetTimer/ResetTimer';

type ResetPasswordProps = {
  isSubmited: boolean;
  setIsSubmited: () => void;
};

export const ResetPassword = ({
  isSubmited,
  setIsSubmited,
}: ResetPasswordProps) => {
  const { t } = useTranslation('common');

  return isSubmited ? (
    <ResetTimer {...{ isSubmited }} />
  ) : (
    <div className='flex flex-col gap-12'>
      <div className='flex flex-col gap-0 md:gap-3'>
        <ResetPasswordForm
          {...{
            route: 'AUTH_FORGOT_PASSWORD',
            method: 'POST',
            handleSubmit: () => setIsSubmited(),
          }}
        />
        <Link href='/auth/logowanie'>
          <p className='cursor-pointer text-center text-navy'>
            {t('auth.resetPassword.backToLogin')}
          </p>
        </Link>
      </div>
    </div>
  );
};
