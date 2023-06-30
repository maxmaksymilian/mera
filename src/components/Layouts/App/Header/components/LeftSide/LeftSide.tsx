import { useRouter } from 'next/router';

import { Icon } from '@/components/commons/Icon/Icon';
import { Link } from '@/components/commons/Link';

import { useAuthContext } from '@/providers/AuthProvider';

import { AdminList } from './components/AdminList';
import { GuestList } from './components/GuestList';

export const LeftSide = () => {
  const { pathname } = useRouter();
  const { isAdmin } = useAuthContext();

  return (
    <div className='mt-4 flex gap-4 pb-3 md:mt-0 md:pb-0 lg:gap-12'>
      <Link href='/'>
        <Icon name='logo' />
      </Link>
      {isAdmin && pathname.includes('/pok') ? <AdminList /> : <GuestList />}
    </div>
  );
};
