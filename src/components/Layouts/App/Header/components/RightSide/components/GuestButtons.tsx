import useTranslation from 'next-translate/useTranslation';

import { Button } from '@/components/commons/Button';
import { Link } from '@/components/commons/Link';

export const GuestButtons = () => {
  const { t } = useTranslation('common');

  return (
    <>
      <li>
        <Link href='/auth/rejestracja'>
          <p className='cursor-pointer font-bold text-navy'>
            {t('header.common.registration')}
          </p>
        </Link>
      </li>
      <li>
        <Link href='/auth/logowanie'>
          <Button>{t('header.common.signIn')}</Button>
        </Link>
      </li>
    </>
  );
};
