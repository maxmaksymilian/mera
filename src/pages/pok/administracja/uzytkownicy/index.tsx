import dynamic from 'next/dynamic';
import useTranslation from 'next-translate/useTranslation';

import { Layout } from '@/components/Layouts/Panel/Layout';

const Admins = dynamic(
  () =>
    import('@/components/Pok/Administration/Admins/Admins').then(
      (m) => m.Admins
    ),
  {
    ssr: false,
  }
);

const AdminsPage = () => {
  const { t } = useTranslation('common');

  return (
    <Layout
      {...{
        title: t('pages.administration.users.title'),
        variant: 'administration',
        breakpoints: [
          { children: 'dashboard', href: '/pok' },
          { children: 'administration', href: '/pok/administracja' },
          { children: 'users' },
        ],
      }}
    >
      <Admins />
    </Layout>
  );
};

export default AdminsPage;
