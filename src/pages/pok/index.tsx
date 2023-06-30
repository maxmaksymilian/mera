import dynamic from 'next/dynamic';

const DynamicDashboard = dynamic(
  () => import('@/components/Pok/Dashboard/Dashboard').then((m) => m.Dashboard),
  {
    ssr: false,
  }
);

const Dashboard = () => <DynamicDashboard />;

export default Dashboard;
