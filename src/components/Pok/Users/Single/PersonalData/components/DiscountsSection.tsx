import useTranslation from 'next-translate/useTranslation';

import { convertDate } from '@/lib/helpers';

import { Skeleton } from '@/components/commons/Skeleton/Skeleton';
import { Status } from '@/components/commons/Status';

type DiscountsSectionProps = {
  isLoading?: boolean;
  document?: {
    [key: string]: any;
  };
};

export const DiscountsSection = ({
  isLoading,
  document,
}: DiscountsSectionProps) => {
  const { t } = useTranslation('common');
  return isLoading ? (
    <Skeleton />
  ) : document ? (
    <div className='pb-10'>
      <div className='flex gap-5'>
        <div className='w-1/2'>
          <div>
            {document.discount.name}
            <p className='pt-2 text-gray'>{t('documentNumber')}</p>
            <p className='pt-2 text-gray'>{t('validityTerm')}:</p>
          </div>
        </div>
        <div className='w-1/2'>
          <Status value={document.verified_at ? 'active' : 'not_active'} />
          <p className='pt-2 text-gray'>{document.number}</p>
          <p className='pt-2 text-gray'>
            {convertDate(document.expiration_date)}
          </p>
        </div>
      </div>
    </div>
  ) : (
    <p>{t('pok.customerData.none')}</p>
  );
};
