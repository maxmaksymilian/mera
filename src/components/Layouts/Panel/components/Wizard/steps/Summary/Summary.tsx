import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';

import { getCardTypeName } from '@/lib/helpers';
import { useApiQuery } from '@/hooks/api/useApiQuery';

import { FormMessage } from '@/components/commons/FormMessage';
import { WizardMutationType } from '@/components/Layouts/Panel/components/Wizard';

import elsImage from '~/images/wizard/els.jpg';

export type SummaryProps = {
  values: WizardMutationType;
  errorContent?: string[] | null;
};

export const Summary = ({ errorContent, values }: SummaryProps) => {
  const { t } = useTranslation('wizard');
  const { data, status } = useApiQuery({ route: 'DISCOUNTS_LIST' });

  const discountName =
    data && status === 'success' && values.document_discount
      ? data.find(({ id }: any) => id === values.document_discount).name
      : '';

  return (
    <>
      {errorContent && (
        <FormMessage success={false}>
          <>
            {errorContent.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </>
        </FormMessage>
      )}
      <div className='flex flex-col gap-10 pt-4 md:flex-row md:gap-40'>
        <div className='hidden md:block'>
          <h2 className='pb-1 text-base font-bold leading-6'>
            {t('steps.summary.documentType')}
          </h2>
          <Image
            src={elsImage}
            alt='legitymacja'
            width={238}
            height={156}
            className='-translate-x-2'
          />
          <p className='text-left text-base leading-6 text-black'>
            {getCardTypeName(values.card_type)}
          </p>
        </div>
        <div className='flex flex-col gap-0 md:w-1/2 md:flex-row md:gap-20'>
          <div className='w-full md:w-1/2'>
            <div className='summary-section pb-6'>
              <h2 className='pb-1 text-base font-bold leading-6'>
                {t('steps.summary.registeredAddressLabel')}
              </h2>
              <div>
                <p className='text-sm leading-6 text-gray md:text-base'>
                  {t('steps.summary.streetShortcut')} {values.address_street}{' '}
                  {values.address_number}
                  {values.address_apt_number
                    ? `/${values.address_apt_number}`
                    : ''}
                </p>
                <p className='text-sm leading-6 text-gray md:text-base'>
                  {values.address_zip} {values.address_city}
                </p>
              </div>
            </div>
            <div className='summary-section pb-6'>
              <h2 className='pb-1 text-base font-bold leading-6'>
                {t('steps.summary.residentialAddressLabel')}
              </h2>
              <div>
                <p className='text-sm leading-6 text-gray md:text-base'>
                  {t('steps.summary.streetShortcut')}{' '}
                  {values.registered_address
                    ? values.address_street
                    : values.registered_address_street}{' '}
                  {values.registered_address
                    ? values.address_number
                    : values.registered_address_number}
                  {values.registered_address
                    ? values.address_apt_number
                    : values.registered_address_apt_number
                    ? `/${
                        values.address_apt_number ||
                        values.registered_address_apt_number
                      }`
                    : ''}
                </p>
                <p className='text-sm leading-6 text-gray md:text-base'>
                  {values.registered_address
                    ? values.address_zip
                    : values.registered_address_zip}{' '}
                  {values.registered_address
                    ? values.address_city
                    : values.registered_address_city}
                </p>
              </div>
            </div>

            {values.company && (
              <div className='summary-section pb-6'>
                <h2 className='pb-1 text-base font-bold leading-6'>
                  {t('steps.summary.residentialAddressLabel')}
                </h2>
                <div>
                  <p className='text-sm leading-6 text-gray md:text-base'>
                    {t('steps.summary.streetShortcut')}{' '}
                    {values.company_address_street}{' '}
                    {values.company_address_number}
                  </p>
                  <p className='text-sm leading-6 text-gray md:text-base'>
                    {values.company_address_zip} {values.company_address_city}
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className='w-full md:w-1/2'>
            {values.document_discount && (
              <div className='summary-section pb-6'>
                <h2 className='pb-1 text-base font-bold leading-6'>
                  {t('steps.summary.discountType')}
                </h2>
                <div>
                  <p className='text-sm leading-6 text-gray md:text-base'>
                    {discountName}
                  </p>
                  <p className='hidden text-sm leading-6 text-gray md:block md:text-base'>
                    &nbsp;
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
