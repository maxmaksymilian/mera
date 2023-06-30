import { Link } from '@/components/commons/Link';
import { Skeleton } from '@/components/commons/Skeleton/Skeleton';
import { Cases } from '@/components/panel';

import { useCasesList } from './useCasesList';

export const CasesList = () => {
  const { cases, status, t } = useCasesList();

  return (
    <div className='py-5'>
      <div className='rounded-xs border-b border-cloud py-2 px-8 sm:p-8 md:border md:py-5'>
        <div className='flex items-center justify-between'>
          <h2 className='pb-2.5 text-md font-bold leading-8'>
            {t('pok.dashboard.casesList')}
          </h2>
          <Link href='/pok/lista-spraw' className='font-semibold text-navy'>
            {t('seeAll')}
          </Link>
        </div>
        <div className='py-4'>
          {status === 'success' ? (
            cases?.length > 0 ? (
              cases?.map((singleCase) => (
                <Cases key={singleCase.id} {...singleCase} isCustomerService />
              ))
            ) : (
              <p>{t('noResults')}</p>
            )
          ) : (
            <Skeleton />
          )}
        </div>
      </div>
    </div>
  );
};
