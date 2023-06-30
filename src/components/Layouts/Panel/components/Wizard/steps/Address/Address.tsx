import { FormikErrors } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import { useEffect } from 'react';

import { clsxm } from '@/lib';
import { useScreen } from '@/hooks/useScreen';

import { Button } from '@/components/commons/Button';
import { Input } from '@/components/commons/Fields';
import { Checkbox } from '@/components/commons/Fields/Checkbox';
import { WizardMutationType } from '@/components/Layouts/Panel/components/Wizard';

export type AddressProps = {
  values: WizardMutationType;
  errors: FormikErrors<{ [field: string]: string }>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFieldValue: (
    field: string,
    value: string | boolean,
    shouldValidate?: boolean | undefined
  ) => void;
};

export const Address = ({
  values,
  errors,
  handleChange,
  setFieldValue,
}: AddressProps) => {
  const { t } = useTranslation('wizard');
  const { isMdUp } = useScreen();

  const addressButtonsHandler = (isSame: boolean) => {
    if (setFieldValue) {
      isSame
        ? setFieldValue('registered_address', true)
        : setFieldValue('registered_address', false);
    }
  };

  const companyButtonsHandler = (isCompanyUser: boolean) => {
    if (setFieldValue) {
      isCompanyUser
        ? setFieldValue('company', true)
        : setFieldValue('company', false);
    }
  };

  useEffect(() => {
    if (values.company === false) {
      const fields = [
        'company_name',
        'company_nip',
        'company_address_zip',
        'company_address_city',
        'company_address_street',
        'company_address_number',
      ];
      fields.forEach((field) => setFieldValue(field, ''));
    }
  }, [values.company]);

  return (
    <div className='form'>
      <div className='field-container pb-7'>
        <p className='pb-4 text-base font-bold leading-6'>
          {t('steps.registeredAddressLabel')}
        </p>
        <div className='fields flex flex-col gap-8 md:flex-row md:flex-wrap'>
          <div className='flex flex-col gap-8 md:flex-row'>
            <div className='w-full'>
              <Input
                type='text'
                name='address_zip'
                value={values.address_zip}
                error={errors.address_zip}
                label={t('steps.address.input.zip.label') + '*'}
                placeholder={t('steps.address.input.zip.placeholder')}
                handleChange={handleChange}
              />
            </div>
            <div className='w-full'>
              <Input
                type='text'
                name='address_city'
                value={values.address_city}
                error={errors.address_city}
                label={t('steps.address.input.city.label') + '*'}
                placeholder={t('steps.address.input.city.placeholder')}
                handleChange={handleChange}
              />
            </div>
            <div className='w-full'>
              <Input
                type='text'
                name='address_street'
                value={values.address_street}
                error={errors.address_street}
                label={t('steps.address.input.street.label') + '*'}
                placeholder={t('steps.address.input.street.placeholder')}
                handleChange={handleChange}
              />
            </div>
          </div>
          <div className='flex gap-5'>
            <div className='w-1/2 md:w-full md:max-w-4xs'>
              <Input
                type='text'
                name='address_number'
                value={values.address_number}
                error={errors.address_number}
                label={t('steps.address.input.streetNum.label') + '*'}
                handleChange={handleChange}
              />
            </div>
            <div className='w-1/2 whitespace-nowrap md:w-full md:max-w-4xs'>
              <Input
                type='text'
                name='address_apt_number'
                value={values.address_apt_number}
                error={errors.address_apt_number}
                label={t('steps.address.input.aptNum.label')}
                handleChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='field-container pb-7'>
        <p className='pb-4 text-base font-bold leading-6'>
          {t('steps.residentialAddressLabel')}
        </p>

        {isMdUp ? (
          <div className='fields flex'>
            <Checkbox
              label={t('steps.address.checkboxLabel')}
              name='registered_address'
              handleChange={handleChange}
              checked={values.registered_address}
            />
          </div>
        ) : (
          <>
            <p className='pb-6 leading-6 text-gray'>
              {t('steps.address.checkboxLabel')}
            </p>
            <div className='flex w-full items-center'>
              <Button
                variant={!values.registered_address ? 'primary' : 'secondary'}
                className='flex-1'
                handleClick={() => addressButtonsHandler(false)}
              >
                {t('steps.address.denialBtnLabel')}
              </Button>
              <Button
                variant={values.registered_address ? 'primary' : 'secondary'}
                className='flex-1'
                handleClick={() => addressButtonsHandler(true)}
              >
                {t('steps.address.approvalBtnLabel')}
              </Button>
            </div>
          </>
        )}
      </div>
      <div
        className={clsxm(
          'field-container',
          'h-0 overflow-hidden opacity-0 transition-all duration-300',
          !values.registered_address &&
            'h-auto overflow-visible pb-7 opacity-100'
        )}
      >
        {!values.registered_address ? (
          <div className='fields flex flex-col gap-8 md:flex-row md:flex-wrap'>
            <div className='flex flex-col gap-8 md:flex-row'>
              <div className='w-full'>
                <Input
                  type='text'
                  name='registered_address_zip'
                  value={values.registered_address_zip}
                  error={errors.registered_address_zip}
                  label={t('steps.address.input.zip.label') + '*'}
                  placeholder={t('steps.address.input.zip.placeholder')}
                  handleChange={handleChange}
                />
              </div>
              <div className='w-full'>
                <Input
                  type='text'
                  name='registered_address_city'
                  value={values.registered_address_city}
                  error={errors.registered_address_city}
                  label={t('steps.address.input.city.label') + '*'}
                  placeholder={t('steps.address.input.city.placeholder')}
                  handleChange={handleChange}
                />
              </div>
              <div className='w-full'>
                <Input
                  type='text'
                  name='registered_address_street'
                  value={values.registered_address_street}
                  error={errors.registered_address_street}
                  label={t('steps.address.input.street.label') + '*'}
                  placeholder={t('steps.address.input.street.placeholder')}
                  handleChange={handleChange}
                />
              </div>
            </div>
            <div className='flex gap-5'>
              <div className='w-1/2 md:w-full md:max-w-4xs'>
                <Input
                  type='text'
                  name='registered_address_number'
                  value={values.registered_address_number}
                  error={errors.registered_address_number}
                  label={t('steps.address.input.streetNum.label') + '*'}
                  handleChange={handleChange}
                />
              </div>
              <div className='w-1/2 whitespace-nowrap md:w-full md:max-w-4xs'>
                <Input
                  type='text'
                  name='registered_address_apt_number'
                  value={values.registered_address_apt_number}
                  error={errors.registered_address_apt_number}
                  label={t('steps.address.input.aptNum.label')}
                  handleChange={handleChange}
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <div className='field-container pb-7'>
        <p className='pb-4 text-base font-bold leading-6'>
          {t('steps.address.companyUserLabel')}
        </p>
        {isMdUp ? (
          <div className='fields flex justify-between'>
            <Checkbox
              label={t('steps.address.companyUserCheckboxLabel')}
              name='company'
              handleChange={handleChange}
              checked={values.company}
            />
          </div>
        ) : (
          <>
            <p className='pb-6 leading-6 text-gray'>
              {t('steps.address.companyUserCheckboxLabel')}
            </p>
            <div className='flex w-full items-center'>
              <Button
                variant={!values.company ? 'primary' : 'secondary'}
                className='flex-1'
                handleClick={() => companyButtonsHandler(false)}
              >
                {t('steps.address.denialBtnLabel')}
              </Button>
              <Button
                variant={values.company ? 'primary' : 'secondary'}
                className='flex-1'
                handleClick={() => companyButtonsHandler(true)}
              >
                {t('steps.address.approvalBtnLabel')}
              </Button>
            </div>
          </>
        )}
      </div>
      <div
        className={clsxm(
          'field-container',
          'h-0 overflow-hidden opacity-0 transition-all duration-300',
          values.company && 'h-auto overflow-visible pb-7 opacity-100'
        )}
      >
        {values.company && (
          <div>
            <div className='fields flex flex-col gap-3 pb-4 sm:flex-wrap md:flex-row md:gap-8'>
              <div>
                <Input
                  type='text'
                  name='company_name'
                  value={values.company_name}
                  error={errors.company_name}
                  label={t('steps.address.company.input.name.label') + '*'}
                  placeholder={t(
                    'steps.address.company.input.name.placeholder'
                  )}
                  handleChange={handleChange}
                />
              </div>
              <div>
                <Input
                  type='text'
                  name='company_nip'
                  value={values.company_nip}
                  error={errors.company_nip}
                  label={t('steps.address.company.input.nip.label') + '*'}
                  placeholder={t('steps.address.company.input.nip.placeholder')}
                  handleChange={handleChange}
                />
              </div>
              <div>
                <Input
                  type='text'
                  name='company_address_zip'
                  value={values.company_address_zip}
                  error={errors.company_address_zip}
                  label={t('steps.address.input.zip.label') + '*'}
                  placeholder={t('steps.address.input.zip.placeholder')}
                  handleChange={handleChange}
                />
              </div>
              <div>
                <Input
                  type='text'
                  name='company_address_city'
                  value={values.company_address_city}
                  error={errors.company_address_city}
                  label={t('steps.address.input.city.label') + '*'}
                  placeholder={t('steps.address.input.city.placeholder')}
                  handleChange={handleChange}
                />
              </div>
            </div>
            <div className='fields sm: flex gap-2.5 pb-4 md:flex-row md:gap-8'>
              <div>
                <Input
                  type='text'
                  name='company_address_street'
                  value={values.company_address_street}
                  error={errors.company_address_street}
                  label={t('steps.address.input.street.label') + '*'}
                  handleChange={handleChange}
                />
              </div>
              <div className='md:w-24'>
                <Input
                  type='text'
                  name='company_address_number'
                  value={values.company_address_number}
                  error={errors.company_address_number}
                  label={t('steps.address.input.streetNum.label') + '*'}
                  handleChange={handleChange}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
