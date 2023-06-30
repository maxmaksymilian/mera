import useTranslation from 'next-translate/useTranslation';

import { Link } from '@/components/commons/Link';

import { Cases, CasesProps } from './Cases';

export const List = ({ items }: { items: CasesProps[] }) => {
  const { t } = useTranslation('common');
  return (
    <div className='hidden overflow-auto rounded-xs border border-cloud p-8 lg:block'>
      <div className='flex justify-between pb-6'>
        <p className='text-2xl font-bold'>{t('yourCases')}</p>
        <Link href='/panel/sprawy'>
          <p className='font-bold text-navy'>{t('seeAll')}</p>
        </Link>
      </div>
      {items ? (
        <>
          {items?.splice(0, 5)?.map((item, index) => (
            <Cases key={index} {...item} />
          ))}
        </>
      ) : (
        <p>{t('noCases')}</p>
      )}
    </div>
  );
};
