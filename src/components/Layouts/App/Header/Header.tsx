import { useEffect, useState } from 'react';

import { clsxm } from '@/lib';

import { LeftSide } from './components/LeftSide/LeftSide';
import { MobileNav } from './components/MobileNav/MobileNav';
import { RightSide } from './components/RightSide/RightSide';
import { useHeader } from './useHeader';

export const Header = () => {
  const { hideHeader, pathname } = useHeader();
  const [isOpen, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  if (hideHeader) {
    return null;
  }

  return (
    <nav
      className={clsxm(
        `fixed z-20 flex w-full items-start bg-white md:items-center`,
        isOpen ? 'h-screen md:h-24' : 'h-24'
      )}
    >
      <div className='mx-auto flex w-full max-w-screen-lg flex-col items-center justify-between'>
        <div className='flex h-24 w-full items-center justify-between px-9 lg:px-0'>
          <LeftSide />
          <RightSide {...{ isOpen, setOpen: () => setOpen((prev) => !prev) }} />
        </div>
        <MobileNav {...{ isOpen }} />
      </div>
    </nav>
  );
};
