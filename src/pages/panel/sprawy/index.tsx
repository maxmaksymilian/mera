import dynamic from 'next/dynamic';

import { Layout } from '@/components/Layouts/Panel/Layout';

const DynamicMyCases = dynamic(
  () => import('@/components/panel/MyCases/MyCases').then((m) => m.MyCases),
  {
    ssr: false,
  }
);

const MyCases = () => (
  <Layout
    {...{
      variant: 'client',
      title: 'Moje sprawy',
      subTitle: 'Zarządzaj zgłoszonymi sprawami',
      hideOnMobile: {
        title: true,
      },
    }}
  >
    <DynamicMyCases />
  </Layout>
);

export default MyCases;
