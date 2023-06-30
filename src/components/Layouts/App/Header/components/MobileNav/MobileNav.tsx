import useTranslation from 'next-translate/useTranslation';

import { clsxm } from '@/lib';

import { Button } from '@/components/commons/Button';
import { Link } from '@/components/commons/Link';
import { LangSwitcher } from '@/components/Layouts/App/Header/components/LangSwitcher/LangSwitcher';
import { links } from '@/components/Layouts/App/Header/HeaderModel';

import { useAuthContext } from '@/providers/AuthProvider';

import { GuestPanel } from './components/GuestPanel';
import { List } from './components/List';
import { UserPanel } from './components/UserPanel';

type MobileNavProps = {
  isOpen: boolean;
};

export const MobileNav = ({ isOpen }: MobileNavProps) => {
  const { t } = useTranslation('common');
  const { isAuth } = useAuthContext();

  return (
    <ul
      className={clsxm(
        `relative flex h-[calc(100vh_-_96px)] w-full flex-col gap-4 justify-self-center pb-3 pt-2 md:hidden`,
        isOpen ? 'block' : 'hidden'
      )}
    >
      {isAuth ? <UserPanel /> : <GuestPanel />}
      <List {...{ links }} />
      <div className='w-full px-9'>
        <Link
          href={isAuth ? '/panel/moje-bilety/zamowienie' : '/auth/logowanie'}
        >
          <Button className='h-16 w-full'>
            {t('header.button.buyTicket')}
          </Button>
        </Link>
      </div>
      <div className='absolute bottom-0 flex h-16 w-full border-t border-cloud'>
        <div className='flex w-1/2 items-center justify-center'>
          {t('header.common.chooseLanguage')}
        </div>
        <div className='flex w-1/2 items-center justify-center'>
          <LangSwitcher />
        </div>
      </div>
    </ul>
  );
};
