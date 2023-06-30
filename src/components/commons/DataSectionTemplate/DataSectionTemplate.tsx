import useTranslation from 'next-translate/useTranslation';
import { useRef } from 'react';

import { clsxm } from '@/lib';

import { Button } from '@/components/commons/Button';

import { DataRecord } from '../DataRecord/DataRecord';
import { Skeleton } from '../Skeleton/Skeleton';

export type DataSectionTemplateProps = {
  access?: string;
  headline: string;
  buttonText?: string;
  children?: React.ReactNode;
  className?: string;
  isBtnHidden?: boolean;
  isPok?: boolean;
  isLoading?: boolean;
  items?: any[];
  handleClick?: () => void;
};

export const DataSectionTemplate = ({
  access,
  headline,
  buttonText,
  children,
  isBtnHidden,
  isLoading,
  items,
  className,
  handleClick,
}: DataSectionTemplateProps) => {
  const cntRef = useRef<HTMLDivElement>(null);

  const handleDataChange = () => {
    handleClick && handleClick();
  };

  const { t } = useTranslation('common');
  return (
    <div
      className={clsxm(
        'pt-5 pb-5',
        'overflow-hidden transition-all duration-300',
        'md:h-auto md:border-t-0',
        className
      )}
    >
      <div ref={cntRef}>
        <div className='flex items-center justify-between pb-9 md:border-b md:border-cloud md:pb-6'>
          <h2 className='text-base font-bold leading-6 md:text-md md:leading-8'>
            {headline}
          </h2>

          {!isBtnHidden && (
            <button
              onClick={handleDataChange}
              className='hidden text-base leading-6 text-navy md:block'
            >
              {headline === `${t('eligibleDiscounts')}` && access === 'client'
                ? `${t('newDiscountCase')}`
                : `${t('buttonEdit')}`}
            </button>
          )}
        </div>
        <div className='md:py-5'>
          {items ? (
            isLoading ? (
              <Skeleton />
            ) : (
              items?.map(({ label, value }, index) => (
                <DataRecord key={index} {...{ label, value }} />
              ))
            )
          ) : (
            children
          )}
        </div>
        {buttonText && (
          <div
            className={clsxm(
              'flex justify-center md:hidden md:pt-10',
              !children && 'pt-0'
            )}
          >
            <Button
              variant='secondary'
              handleClick={handleDataChange}
              className='mt-10 h-12 w-full'
            >
              {buttonText}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
