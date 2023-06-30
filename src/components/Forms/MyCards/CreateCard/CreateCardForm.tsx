import useTranslation from 'next-translate/useTranslation';

import { cardTypeOptions } from '@/lib/options/options';

import { Button } from '@/components/commons/Button';
import { CardInput } from '@/components/commons/Form/Fields/CardInput';
import { ExpirationDateInput } from '@/components/commons/Form/Fields/ExpirationDateInput/ExpirationDateInput';
import { Input } from '@/components/commons/Form/Fields/Input';
import { UserSelect } from '@/components/commons/Form/Fields/Select/DynamicVariants/UserSelect';
import { Select } from '@/components/commons/Form/Fields/Select/Select';
import { SubmitButton } from '@/components/commons/Form/Fields/SubmitButton';
import { Form } from '@/components/commons/Form/Form';
import { FormMessage } from '@/components/commons/Form/FormMessage';
import { FormProps } from '@/components/Forms/@types/Form';

import { useCreateCardForm } from './useCreateCardForm';

export type CreateCardFormProps = {
  handleClose: () => void;
} & FormProps;

export const CreateCardForm = ({
  buttonLabel,
  access,
  ...props
}: CreateCardFormProps) => {
  const { t } = useTranslation('common');
  const { form, isLoading, errors } = useCreateCardForm(props);
  const { handleClose } = props;

  return (
    <Form {...{ form, className: 'flex flex-col gap-4' }}>
      <FormMessage {...{ type: 'error', params: errors, prefix: 'card' }} />
      <div className='flex flex-col items-start justify-between gap-3.5 pt-5 md:flex-row'>
        <div className='w-full pb-1 md:flex-1 md:pb-0'>
          <UserSelect
            name='user'
            label='cardUser'
            placeholder='user'
            access={access}
          />
        </div>
      </div>
      <div className='pb-1 md:pb-0'>
        <Select
          name='type'
          label='chooseCardType'
          placeholder='chooseCardType'
          options={cardTypeOptions}
        />
      </div>
      <div className='pb-1 md:pb-0'>
        <Input name='name' label='cardName' placeholder='cardNameExample' />
      </div>
      <div className='flex flex-col items-start justify-between gap-3.5 md:flex-row'>
        <div className='w-full pb-1 md:flex-1 md:pb-0'>
          {form.values.type === 'emv_card' ? (
            <CardInput
              name='number'
              label='numberCard'
              firstMax={6}
              secondMax={4}
            />
          ) : (
            <Input
              type='text'
              name='number'
              label='numberCard'
              placeholder='numberCardSix'
            />
          )}

          <p className='pt-1 text-sm leading-6 text-gray md:text-sm'>
            {form.values.type !== 'city_card'
              ? form.values.type === 'emv_card'
                ? t('enter4LastDigits')
                : t('enter6CardNumber')
              : ''}
          </p>
        </div>
        <div className='w-full pb-1 md:flex-1 md:pb-0'>
          {form.values.type !== 'city_card' && (
            <ExpirationDateInput
              type='text'
              name='expiration_date'
              label='expirationDateCard'
              placeholder='exampleExpirationDateCard'
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
        <SubmitButton
          {...{
            label: buttonLabel || 'createCard',
            loading: isLoading,
            className: 'order-1 md:order-2',
          }}
        />
      </div>
    </Form>
  );
};
