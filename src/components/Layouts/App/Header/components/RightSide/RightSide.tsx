import { ToggleBurgerType } from '@/components/Layouts/App/Header/@types/HeaderType';
import { LangSwitcher } from '@/components/Layouts/App/Header/components/LangSwitcher/LangSwitcher';

import { useAuthContext } from '@/providers/AuthProvider';

import { Burger } from './components/Burger';
import { GuestButtons } from './components/GuestButtons';
import { UserButtons } from './components/UserButtons';
import { UserInfo } from './components/UserInfo';

export const RightSide = (props: ToggleBurgerType) => {
  const { isAuth, isClient } = useAuthContext();

  return (
    <div className='flex items-center gap-4 lg:gap-8'>
      <div className='flex items-center gap-6'>
        {isAuth ? <UserInfo {...{ isClient }} /> : null}
        <Burger {...props} />
      </div>
      <ul className='hidden items-center gap-4 md:flex lg:gap-8'>
        <li>
          <LangSwitcher />
        </li>
        {isAuth ? <UserButtons /> : <GuestButtons />}
      </ul>
    </div>
  );
};
