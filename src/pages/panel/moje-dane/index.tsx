import dynamic from 'next/dynamic';

import { Layout } from '@/components/Layouts/Panel/Layout';

const DynamicMyData = dynamic(
  () => import('@/components/panel/MyData/MyData').then((m) => m.MyData),
  {
    ssr: false,
  }
);

const MyData = () => (
  <Layout
    {...{
      variant: 'client',
      title: `Moje dane`,
      subTitle: 'Zarządzaj danymi na swoim koncie',
      hideOnMobile: { title: true },
    }}
  >
    <DynamicMyData />
  </Layout>
);

export default MyData;
