import { useFormik } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import { addCardValidation, useAppStore } from '@/lib';
import { useApiMutation } from '@/hooks/api/useApiMutation';

import { Button } from '@/components/commons/Button';
import { CustomSelectInput } from '@/components/commons/CustomSelectInput';
import { Input } from '@/components/commons/Fields';
import { ExpirationDateInput } from '@/components/commons/Fields/ExpirationDateInput/ExpirationDateInput';
import { UserSelect } from '@/components/commons/Fields/UserSelect';
import { FormMessage } from '@/components/commons/FormMessage';
import { PaymentCardInput } from '@/components/commons/PaymentCardInput';
import { Spinner } from '@/components/commons/Spinner';
import { CardType } from '@/components/panel/MyCards/MyCardsModel';

import { cardTypes } from './const';

export type EditCardProps = {
  handleClose: () => void;
  handleRefresh: () => void;
  card: CardType;
};

export const EditCard = ({
  handleClose,
  handleRefresh,
  card,
}: EditCardProps) => {
  const { t } = useTranslation('common');
  const { token } = useAppStore();
  const { mutate } = useApiMutation({
    route: 'PROFILE_MY_CARDS',
    method: 'PUT',
    id: card.id,
  });
  const [isLoading, setLoading] = useState<boolean>(false);
  const [errorContent, setErrorContent] = useState<string | null>();
  const {
    errors,
    values,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      user: card.user ? card.user.id : '',
      status: card.status,
      type: card.type,
      name: card.name,
      number: card.number,
      expiration_date: card.expiration_date,
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: addCardValidation,
    onSubmit: (values) => {
      setLoading(true);
      mutate(
        { ...values, id: card.id, token },
        {
          onSuccess: ({ error }) => {
            if (error) {
              setLoading(false);
              return setErrorContent(error);
            }
            setLoading(false);
            handleRefresh();
            handleClose();
          },
        }
      );
    },
  });

  return (
    <div>
      <form
        id='edit-card-form'
        className='flex flex-col gap-4'
        onSubmit={handleSubmit}
      >
        {errorContent && (
          <FormMessage success={false}>{errorContent}</FormMessage>
        )}
        <div className='flex flex-col items-start justify-between gap-3.5 pt-5 md:flex-row'>
          <div className='w-full pb-1 md:flex-1 md:pb-0'>
            <UserSelect
              label={`${t('owner')} / ${t('user')}`}
              name='user'
              value={values.user}
              error={errors.user}
              setFieldValue={(value: string) => setFieldValue('user', value)}
            />
          </div>
        </div>
        <div className='pb-1 md:pb-0'>
          <CustomSelectInput
            label={t('choseCarrierType')}
            name='type'
            options={cardTypes}
            value={values.type}
            error={errors.type}
            placeholder={t('choseCarrierType')}
            setFieldValue={setFieldValue}
          />
        </div>
        <div className='pb-1 md:pb-0'>
          <Input
            type='text'
            name='name'
            label={t('cardNameLabel')}
            value={values.name}
            error={errors.name}
            touched={touched.name}
            placeholder={t('cardNamePlaceholder')}
            handleBlur={handleBlur}
            handleChange={handleChange}
          />
        </div>
        <div className='flex flex-col items-start justify-between gap-3.5 md:flex-row'>
          <div className='w-full pb-1 md:flex-1 md:pb-0'>
            <div>
              {values.type === 'emv_card' ? (
                <PaymentCardInput
                  name='number'
                  label={t('cardNumber')}
                  value={values.number}
                  error={errors.number}
                  setFieldValue={setFieldValue}
                />
              ) : (
                <Input
                  type='text'
                  name='number'
                  label={t('cardNumber')}
                  value={values.number}
                  error={errors.number}
                  touched={touched.number}
                  placeholder='_ _ _ _ _ _'
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                />
              )}
              <p className='pt-1 text-sm leading-6 text-gray md:text-base'>
                {values.type !== 'city_card'
                  ? values.type === 'emv_card'
                    ? t('enter4LastDigits')
                    : t('enter6CardNumber')
                  : ''}
              </p>
            </div>
          </div>
          <div className='w-full pb-1 md:flex-1 md:pb-0'>
            {values.type !== 'city_card' && (
              <ExpirationDateInput
                name='expiration_date'
                value={values.expiration_date}
                error={errors?.expiration_date}
                label={t('expirationDate')}
                placeholder={t('expirationDatePlaceholder')}
                setFieldValue={setFieldValue}
              />
            )}
          </div>
        </div>
        <div className='flex flex-col justify-center gap-2.5 py-5 pb-10 md:flex-row md:gap-5 md:py-0 md:pt-10'>
          <Button
            variant='secondary'
            handleClick={handleClose}
            className='order-2 md:order-1'
          >
            {t('cancel')}
          </Button>
          <Button
            type='submit'
            variant='primary'
            className='order-1 md:order-2'
          >
            {isLoading ? <Spinner /> : t('buttonSaveChanges')}
          </Button>
        </div>
      </form>
    </div>
  );
};
