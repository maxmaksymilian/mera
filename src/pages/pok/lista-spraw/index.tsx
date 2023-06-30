import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import { Layout } from '@/components/Layouts/Panel/Layout';
import { CasesListPageComponent } from '@/components/Pok/Dashboard/CasesListPage/CasesListPage';

const CasesListPage = () => {
  const { t } = useTranslation('common');
  const { query } = useRouter();
  const transactionId = query?.transactionId || undefined;
  const [isOpen, setIsOpen] = useState(transactionId ? true : false);

  return (
    <Layout
      {...{
        title: t('casesList'),
        button: {
          children: t('buttonAddCase'),
          handleClick: () => setIsOpen(true),
        },
        breakpoints: [
          { children: 'dashboard', href: '/pok' },
          { children: 'casesList' },
        ],
        hideOnMobile: { title: true, subTitle: true },
      }}
    >
      <CasesListPageComponent {...{ isOpen, setIsOpen }} />
    </Layout>
  );
};

export default CasesListPage;
