import dynamic from 'next/dynamic';
import useTranslation from 'next-translate/useTranslation';

import { Layout } from '@/components/Layouts/Panel/Layout';

const Reports = dynamic(
  () => import('@/components/Pok/Reports/Reports').then((m) => m.Reports),
  {
    ssr: false,
  }
);

const ReportsSellingByTypePage = () => {
  const { t } = useTranslation('common');

  return (
    <Layout
      {...{
        variant: 'reports',
        title: t('reportsSellingByType'),
        button: {
          children: 'Sprzedaj bilet',
          href: '#',
        },
        breakpoints: [
          { children: 'dashboard', href: '/pok' },
          { children: 'reports' },
        ],
        hideOnMobile: { title: true, subTitle: true },
      }}
    >
      <Reports {...{ type: 'tickets' }} />
    </Layout>
  );
};

export default ReportsSellingByTypePage;
