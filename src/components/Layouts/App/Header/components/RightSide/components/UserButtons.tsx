import useTranslation from 'next-translate/useTranslation';

import { Button } from '@/components/commons/Button';
import { Link } from '@/components/commons/Link';

import { useAuthContext } from '@/providers/AuthProvider';

export const UserButtons = () => {
  const { t } = useTranslation('common');
  const { logout, isClient } = useAuthContext();

  const panelLink = isClient ? '/panel' : '/pok';
  const panelText = isClient ? 'clientPanel' : 'adminPanel';

  return (
    <>
      <li>
        <button onClick={logout}>
          <p className='cursor-pointer font-bold text-navy'>
            {t('header.common.signOut')}
          </p>
        </button>
      </li>
      <li>
        <Link href={panelLink}>
          <Button>{t(`header.common.${panelText}`)}</Button>
        </Link>
      </li>
    </>
  );
};
