import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

import { useApiQuery } from '@/hooks/api/useApiQuery';

import { CreateRoleForm } from '@/components/Forms/Admin/CreateRole/CreateRoleForm';
import { Layout } from '@/components/Layouts/Panel/Layout';

const RolesPage = ({
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { t } = useTranslation('common');
  const { push } = useRouter();
  const { data: role, refetch } = useApiQuery({
    route: 'POK_ALL_ROLES',
    id,
  });

  return (
    <Layout
      {...{
        title: t('pages.administration.editRole.title'),
        variant: 'administration',
        breakpoints: [
          { children: 'dashboard', href: '/pok' },
          { children: 'administration', href: '/pok/administracja' },
          { children: 'roles', href: '/pok/administracja/role' },
        ],
      }}
    >
      <>
        {role ? (
          <CreateRoleForm
            {...{
              route: 'POK_ALL_ROLES',
              method: 'PUT',
              oldValues: {
                name: role.name,
                status: role.status,
                permission: role.permissions.map(
                  ({ id }: { id: string }) => id
                ),
                id,
              },
              handleSubmit: () => {
                refetch();
                push('/pok/administracja/role');
              },
            }}
          />
        ) : null}
      </>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  return {
    props: {
      id: query.id,
    },
  };
};

export default RolesPage;
