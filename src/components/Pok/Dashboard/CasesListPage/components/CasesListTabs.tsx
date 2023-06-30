import useTranslation from 'next-translate/useTranslation';
import { Dispatch, SetStateAction } from 'react';

import { clsxm } from '@/lib';

type Tab = {
  name: string;
  label: string;
};

type CasesListTabsProps = {
  activeTab: Tab;
  tabs: Tab[];
  setActiveTab: Dispatch<SetStateAction<Tab>>;
};

export const CasesListTabs = ({
  tabs,
  activeTab,
  setActiveTab,
}: CasesListTabsProps) => {
  const { t } = useTranslation('common');
  return (
    <ul className='flex items-center gap-5 border-b border-cloud'>
      {tabs.map((tab: { name: string; label: string }) => (
        <li
          key={tab.name}
          className={clsxm(
            'cursor-pointer pb-6',
            activeTab.name === tab.name &&
              'border-b-2 border-navy font-semibold text-navy'
          )}
          onClick={() => setActiveTab(tab)}
        >
          {t(tab.label)}
        </li>
      ))}
    </ul>
  );
};
