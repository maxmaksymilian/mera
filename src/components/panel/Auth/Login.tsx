import useTranslation from 'next-translate/useTranslation';

import { Button } from '@/components/commons/Button';
import { Link } from '@/components/commons/Link';
import { LoginForm } from '@/components/Forms/Auth/Login/LoginForm';

import { useAuthContext } from '@/providers/AuthProvider';

export const Login = () => {
  const { t } = useTranslation('common');
  const { setDataOnLogIn } = useAuthContext();

  return (
    <div className='flex flex-col gap-12'>
      <div className='flex flex-col gap-0 md:gap-3'>
        <LoginForm
          {...{
            route: 'AUTH_LOGIN',
            method: 'POST',
            handleSubmit: ({ data, values }) =>
              setDataOnLogIn({
                ...data,
                user: { ...data.user, email: values.email },
              }),
          }}
        />
        <Link href='/auth/resetowanie-hasla' className='py-2.5 md:py-0'>
          <p className='cursor-pointer text-navy'>{t('auth.login.remember')}</p>
        </Link>
      </div>
      <div className='flex flex-col gap-6'>
        <p className='text-base md:text-md'>
          {t('auth.login.doYouHaveAccount')}
        </p>
        <Link href='/auth/rejestracja'>
          <Button
            variant='secondary'
            fullWidth={true}
            className='text-sm md:text-base'
          >
            {t('auth.login.register')}
          </Button>
        </Link>
      </div>
    </div>
  );
};
