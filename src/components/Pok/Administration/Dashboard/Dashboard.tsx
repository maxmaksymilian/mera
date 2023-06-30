import useTranslation from 'next-translate/useTranslation';

import { useAuth } from '@/hooks/useAuth';

import { AdministrationCard } from '@/components/commons/Cards/AdministrationCard';

import { sections } from './DasboardModel';

export const Dashboard = () => {
  const { hasAccess } = useAuth();
  const { t } = useTranslation('common');

  return (
    <div className='flex flex-col gap-14'>
      {sections.map(({ title, tabs }) => (
        <div key={title} className='flex flex-col gap-11'>
          <h4 className='text-2xl leading-8'>
            {t(`pages.administration.sections.${title}.title`)}
          </h4>
          <div className='flex flex-row flex-wrap gap-x-8 gap-y-6'>
            {tabs
              .filter(({ permission }) => !permission || hasAccess(permission))
              .map((tab) => (
                <AdministrationCard
                  key={`${title}-${tab.name}`}
                  {...{
                    ...tab,
                    name: t(
                      `pages.administration.sections.${title}.tabs.${tab.name}`
                    ),
                    className:
                      'w-full md:w-[calc(50%_-_16px)] lg:w-[calc((100%_-_64px)_/_3)]',
                  }}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};
