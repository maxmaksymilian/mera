import { FormikErrors } from 'formik';
import useTranslation from 'next-translate/useTranslation';

import { CustomSelectInput } from '@/components/commons/CustomSelectInput';
import { Input } from '@/components/commons/Fields';
import { ExpirationDateInput } from '@/components/commons/Fields/ExpirationDateInput/ExpirationDateInput';
import { PaymentCardInput } from '@/components/commons/PaymentCardInput';
import { customSelectCardTypeOptions } from '@/components/Layouts/Panel/components/Wizard/const';
import { WizardMutationType } from '@/components/Layouts/Panel/components/Wizard/Wizard';

export type CardDataProps = {
  values: WizardMutationType;
  errors: FormikErrors<{ [field: string]: string }>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFieldValue: (
    field: string,
    value: string,
    shouldValidate?: boolean | undefined
  ) => void;
};

export const CardData = ({
  values,
  errors,
  setFieldValue,
  handleChange,
}: CardDataProps) => {
  const { t } = useTranslation('wizard');

  const isDateExp =
    values.card_type === 'student_card' || values.card_type === 'emv_card';

  return (
    <div className='step-two flex flex-col md:w-11/12 md:gap-5'>
      <div className='pb-2.5 md:pb-0'>
        <CustomSelectInput
          name='card_type'
          options={customSelectCardTypeOptions}
          value={values.card_type}
          error={errors?.card_type}
          label={t('steps.cardData.input.cardType.label')}
          placeholder={t('steps.cardData.input.cardType.placeholder')}
          setFieldValue={setFieldValue}
        />
      </div>
      <div className='input-container pb-2.5 md:pb-0'>
        <Input
          name='card_name'
          type='text'
          value={values.card_name}
          error={errors?.card_name}
          label={t('steps.cardData.input.cardName.label')}
          placeholder={t('steps.cardData.input.cardName.placeholder')}
          handleChange={handleChange}
        />
      </div>
      <div className='gap-4 pb-2.5 md:flex md:pb-0'>
        <div className='w-full pb-2.5 md:w-88 md:pb-0'>
          {values.card_type === 'emv_card' ? (
            <PaymentCardInput
              name='card_number'
              label={t('steps.cardData.input.cardNumber.label')}
              value={values.card_number}
              error={errors.card_number}
              setFieldValue={setFieldValue}
            />
          ) : (
            <Input
              type='text'
              name='card_number'
              value={values.card_number}
              error={errors?.card_number}
              label={t('steps.cardData.input.cardNumber.label')}
              placeholder={
                values.card_type === 'city_card'
                  ? ''
                  : t('steps.cardData.input.cardNumber.placeholder')
              }
              handleChange={handleChange}
            />
          )}
          {values.card_type !== 'city_card' && (
            <p className='pt-1 text-sm leading-6 text-gray md:text-sm'>
              {values.card_type
                ? values.card_type === 'emv_card'
                  ? t('enter4LastDigits')
                  : t('enter6CardNumber')
                : ''}
            </p>
          )}
        </div>
        <div className='w-full pb-2.5 md:w-88 md:pb-0'>
          {isDateExp && (
            <ExpirationDateInput
              name='card_expiration_date'
              value={values.card_expiration_date}
              error={errors?.card_expiration_date}
              label={t('steps.cardData.input.expirationDate.label')}
              placeholder={t('steps.cardData.input.expirationDate.placeholder')}
              setFieldValue={setFieldValue}
            />
          )}
        </div>
      </div>
    </div>
  );
};
