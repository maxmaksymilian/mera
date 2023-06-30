import useTranslation from 'next-translate/useTranslation';

import { useAppStore } from '@/lib';

import { Link } from '@/components/commons/Link';

import { useAuthContext } from '@/providers/AuthProvider';

export const UserPanel = () => {
  const { t } = useTranslation('common');
  const { logout, isClient } = useAuthContext();
  const {
    personalData: {
      profile: { first_name },
    },
  } = useAppStore();

  const panelLink = isClient ? '/panel' : '/pok';
  const panelText = isClient ? 'clientPanel' : 'adminPanel';

  return (
    <div>
      <div className='flex h-14 w-full items-center border-t border-cloud px-9'>
        {t('header.common.welcomeLabel')} {first_name}
      </div>
      <div className='flex h-18 w-full border-y border-cloud'>
        <div className='flex w-1/2 items-center justify-center'>
          <Link href={panelLink}>
            <p className='font-bold text-navy'>
              {t(`header.common.${panelText}`)}
            </p>
          </Link>
        </div>
        <div className='flex w-1/2 items-center justify-center'>
          <button onClick={logout}>
            <p className='font-bold text-navy'>{t('header.common.signOut')}</p>
          </button>
        </div>
      </div>
    </div>
  );
};
