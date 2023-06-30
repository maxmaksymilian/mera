import useTranslation from 'next-translate/useTranslation';

import { Button } from '@/components/commons/Button';
import { Icon } from '@/components/commons/Icon/Icon';
import { Link } from '@/components/commons/Link';

export const LoginCard = () => {
  const { t } = useTranslation('events');
  return (
    <div className='flex flex-col items-center justify-center gap-5 rounded-xs bg-cloud py-10 px-5'>
      <Icon name='info' />
      <p className='text-base font-bold leading-6 text-black'>
        {t('events.loginCard.headline')}
      </p>
      <p className='text-center text-sm leading-6 text-gray'>
        {t('events.loginCard.subHeadline')}
      </p>
      <div className='flex flex-col items-center gap-2.5'>
        <Link href='/auth/logowanie'>
          <Button>{t('events.loginCard.logInBtn')}</Button>
        </Link>
        <Link href='/auth/rejestracja'>
          <Button variant='quaternary'>
            {t('events.loginCard.registerBtn')}
          </Button>
        </Link>
      </div>
    </div>
  );
};
