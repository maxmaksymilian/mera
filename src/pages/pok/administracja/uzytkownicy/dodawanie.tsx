import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

import { CreateAdminForm } from '@/components/Forms/Admin/Create/CreateAdminForm';
import { Layout } from '@/components/Layouts/Panel/Layout';

const AdminsPage = () => {
  const { t } = useTranslation('common');
  const { push } = useRouter();

  return (
    <Layout
      {...{
        title: t('pages.administration.createUser.title'),
        variant: 'administration',
        breakpoints: [
          { children: 'dashboard', href: '/pok' },
          { children: 'administration', href: '/pok/administracja' },
          { children: 'users', href: '/pok/administracja/uzytkownicy' },
        ],
      }}
    >
      <CreateAdminForm
        {...{
          route: 'POK_ADMINS',
          method: 'POST',
          handleSubmit: () => push('/pok/administracja/uzytkownicy'),
        }}
      />
    </Layout>
  );
};

export default AdminsPage;
