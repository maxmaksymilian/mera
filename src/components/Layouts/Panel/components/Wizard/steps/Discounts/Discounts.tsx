import { FormikErrors } from 'formik';
import useTranslation from 'next-translate/useTranslation';

import { useApiQuery } from '@/hooks/api/useApiQuery';

import { CustomSelectInput } from '@/components/commons/CustomSelectInput';
import { Checkbox } from '@/components/commons/Fields/Checkbox';
import { FileDropField } from '@/components/Layouts/Panel/components/Wizard';
import { WizardMutationType } from '@/components/Layouts/Panel/components/Wizard';

export type DiscountsProps = {
  values: WizardMutationType;
  errors: FormikErrors<{ [field: string]: string }>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFieldValue: (
    field: string,
    value: string | (File | null),
    shouldValidate?: boolean | undefined
  ) => void;
};

export const Discounts = ({
  values,
  errors,
  handleChange,
  setFieldValue,
}: DiscountsProps) => {
  const { t } = useTranslation('wizard');

  const clearDiscountValues = () => {
    const fileFields = ['document_front', 'document_back'];
    const textFields = ['document_discount'];

    textFields.forEach((field) => setFieldValue(field, ''));
    fileFields.map((field) => setFieldValue(field, null));
  };
  const { data, status } = useApiQuery({ route: 'DISCOUNTS_LIST' });
  return (
    <>
      <div className='pb-8'>
        <Checkbox
          label={t('steps.discounts.isDiscountLabel')}
          name='is_discount'
          handleChange={(e) => {
            handleChange(e);
            clearDiscountValues();
          }}
          checked={values.is_discount}
        />
      </div>
      {values.is_discount && (
        <div className='flex flex-col gap-7 md:flex-row md:gap-16'>
          <div className='flex flex-1 flex-col gap-5'>
            <div>
              {status === 'success' ? (
                <CustomSelectInput
                  name='document_discount'
                  value={values.document_discount}
                  options={[
                    ...data.map((discount: any) => ({
                      name: discount.name,
                      value: discount.id,
                    })),
                  ]}
                  label={t('steps.discounts.input.discountType.label')}
                  placeholder={t(
                    'steps.discounts.input.discountType.placeholder'
                  )}
                  setFieldValue={setFieldValue}
                />
              ) : null}
            </div>
          </div>
          <div className='flex-1'>
            <p className='pb-3 text-base font-bold leading-6'>
              {t('steps.discounts.files.headline')}
            </p>
            <p className='text-base leading-6 text-gray'>
              {t('steps.discounts.files.info')}
            </p>
            <div className='upload-container flex flex-col items-start md:flex-row'>
              <FileDropField
                name='document_front'
                headline={t('steps.discounts.files.frontInputLabel')}
                setFieldValue={setFieldValue}
                value={values.document_front}
                error={errors.document_front}
              />
              <FileDropField
                name='document_back'
                headline={t('steps.discounts.files.backInputLabel')}
                setFieldValue={setFieldValue}
                value={values.document_back}
                error={errors.document_back}
              />
            </div>
            <p className='text-base leading-6 text-gray'>
              {t('steps.discounts.formatsLabel')}:
              <span className='font-semibold text-black'> pdf, jpg, png</span>.{' '}
              {t('steps.discounts.maxFileWeightLabel')}:{' '}
              <span className='font-semibold text-black'> 1MB</span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};
