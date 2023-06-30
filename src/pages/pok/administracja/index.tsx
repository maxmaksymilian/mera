import useTranslation from 'next-translate/useTranslation';

import { Layout } from '@/components/Layouts/Panel/Layout';
import { Dashboard } from '@/components/Pok/Administration/Dashboard/Dashboard';

const AdministrationPage = () => {
  const { t } = useTranslation('common');

  return (
    <Layout
      {...{
        title: t('pages.administration.title'),
        variant: 'administration',
        breakpoints: [
          { children: 'dashboard', href: '/pok' },
          { children: 'administration' },
        ],
      }}
    >
      <Dashboard />
    </Layout>
  );
};

export default AdministrationPage;
