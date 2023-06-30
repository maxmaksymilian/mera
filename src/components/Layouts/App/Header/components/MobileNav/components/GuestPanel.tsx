import useTranslation from 'next-translate/useTranslation';

import { Link } from '@/components/commons/Link';

export const GuestPanel = () => {
  const { t } = useTranslation('common');

  return (
    <div className='flex h-14 w-full border-y border-cloud'>
      <div className='flex w-1/2 items-center justify-center'>
        <Link href='/auth/rejestracja'>
          <p className='font-bold text-navy'>
            {t('header.common.registration')}
          </p>
        </Link>
      </div>
      <div className='flex w-1/2 items-center justify-center border-l border-cloud'>
        <Link href='/auth/logowanie'>
          <p className='font-bold text-navy'>{t('header.common.signIn')}</p>
        </Link>
      </div>
    </div>
  );
};
