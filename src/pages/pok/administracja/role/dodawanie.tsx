import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

import { CreateRoleForm } from '@/components/Forms/Admin/CreateRole/CreateRoleForm';
import { Layout } from '@/components/Layouts/Panel/Layout';

const RolesPage = () => {
  const { t } = useTranslation('common');
  const { push } = useRouter();

  return (
    <Layout
      {...{
        title: t('pages.administration.roles.buttonText'),
        variant: 'administration',
        breakpoints: [
          { children: 'dashboard', href: '/pok' },
          { children: 'administration', href: '/pok/administracja' },
          { children: 'roles', href: '/pok/administracja/role' },
        ],
      }}
    >
      <CreateRoleForm
        {...{
          route: 'POK_ALL_ROLES',
          method: 'POST',
          handleSubmit: () => push('/pok/administracja/role'),
        }}
      />
    </Layout>
  );
};

export default RolesPage;
