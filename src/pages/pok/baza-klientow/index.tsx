import dynamic from 'next/dynamic';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import { Layout } from '@/components/Layouts/Panel/Layout';

const Users = dynamic(
  () => import('@/components/Pok/Users/Users').then((m) => m.Users),
  {
    ssr: false,
  }
);

const MyUsersPage = () => {
  const { t } = useTranslation('common');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Layout
      {...{
        title: t('customerDatabase'),
        subTitle: t('customerDatabase'),
        button: {
          children: t('buttonAddUser'),
          handleClick: () => setIsOpen(true),
        },
        breakpoints: [
          { children: 'dashboard', href: '/pok' },
          { children: 'usersDatabase' },
        ],
        hideOnMobile: { title: true, subTitle: true },
      }}
    >
      <Users {...{ isOpen, setIsOpen }} />
    </Layout>
  );
};

export default MyUsersPage;
