import dynamic from 'next/dynamic';

import { Layout } from '@/components/Layouts/Panel/Layout';

const DynamicMyUsers = dynamic(
  () => import('@/components/panel/MyUsers/MyUsers').then((m) => m.MyUsers),
  {
    ssr: false,
  }
);

const MyUsersPage = () => (
  <Layout
    {...{
      variant: 'client',
      title: 'Moi użytkownicy',
      subTitle: 'Zarządzaj danymi swoich dzieci',
      hideOnMobile: {
        title: true,
      },
    }}
  >
    <DynamicMyUsers />
  </Layout>
);

export default MyUsersPage;
