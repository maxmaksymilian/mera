import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

import { useApiQuery } from '@/hooks/api/useApiQuery';

import { CreateAdminForm } from '@/components/Forms/Admin/Create/CreateAdminForm';
import { Layout } from '@/components/Layouts/Panel/Layout';

const AdminsPage = ({
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { t } = useTranslation('common');
  const { push } = useRouter();
  const { data: admin, refetch } = useApiQuery({
    route: 'POK_ADMINS',
    id,
  });

  return (
    <Layout
      {...{
        title: t('pages.administration.editUser.title'),
        variant: 'administration',
        breakpoints: [
          { children: 'dashboard', href: '/pok' },
          { children: 'administration', href: '/pok/administracja' },
          { children: 'users', href: '/pok/administracja/uzytkownicy' },
        ],
      }}
    >
      <>
        {admin ? (
          <CreateAdminForm
            {...{
              route: 'POK_ADMINS',
              method: 'PUT',
              oldValues: {
                ...admin.profile,
                telephone: admin.profile.telephone?.telephone
                  ? admin.profile.telephone.telephone
                  : '',
                email: admin.email,
                status: admin.status,
                role: admin.roles.map(({ id }: { id: string }) => id),
                id,
              },
              handleSubmit: () => {
                refetch();
                push('/pok/administracja/uzytkownicy');
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

export default AdminsPage;
