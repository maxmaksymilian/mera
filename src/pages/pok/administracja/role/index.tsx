import dynamic from 'next/dynamic';
import useTranslation from 'next-translate/useTranslation';

import { Layout } from '@/components/Layouts/Panel/Layout';

const Roles = dynamic(
  () =>
    import('@/components/Pok/Administration/Roles/Roles').then((m) => m.Roles),
  {
    ssr: false,
  }
);

const RolesPage = () => {
  const { t } = useTranslation('common');

  return (
    <Layout
      {...{
        title: t('pages.administration.roles.title'),
        variant: 'administration',
        breakpoints: [
          { children: 'dashboard', href: '/pok' },
          { children: 'administration', href: '/pok/administracja' },
          { children: 'roles' },
        ],
      }}
    >
      <Roles />
    </Layout>
  );
};

export default RolesPage;
