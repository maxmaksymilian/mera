import { FormikContextType, FormikValues, useFormikContext } from 'formik';

import { cardTypeOptions } from '@/lib/options/options';
import { GetErrorMessageProps } from '@/hooks/useMessage';

import { Button } from '@/components/commons/Button';
import { CardInput } from '@/components/commons/Form/Fields/CardInput';
import { Checkbox } from '@/components/commons/Form/Fields/Checkbox';
import { ExpirationDateInput } from '@/components/commons/Form/Fields/ExpirationDateInput/ExpirationDateInput';
import { Input } from '@/components/commons/Form/Fields/Input';
import { Select } from '@/components/commons/Form/Fields/Select/Select';
import { FormMessage } from '@/components/commons/Form/FormMessage';

export const CardData = ({ params }: Pick<GetErrorMessageProps, 'params'>) => {
  const { values, setFieldValue }: FormikContextType<FormikValues> =
    useFormikContext();

  return (
    <div className='step-two mx-auto w-full md:w-2/3'>
      <FormMessage {...{ type: 'error', params, prefix: 'user' }} />
      <div className='hidden pb-5 pt-3 md:block'>
        <Checkbox name='card'>
          <span className='flex h-full items-center'>
            Chcę dodać nową kartę
          </span>
        </Checkbox>
      </div>
      <div className='block pb-5 pt-3 md:hidden'>
        <p className='pb-4'>Chcę dodać nową kartę</p>
        <Button
          handleClick={() => setFieldValue('card', (values.card = '0'))}
          variant={values.card === '1' ? 'secondary' : 'primary'}
          className='w-1/2'
        >
          Nie
        </Button>
        <Button
          handleClick={() => setFieldValue('card', (values.card = '1'))}
          variant={values.card === '1' ? 'primary' : 'secondary'}
          className='w-1/2'
        >
          TAK
        </Button>
      </div>
      {values.card === '1' && (
        <div className='flex flex-col gap-5'>
          <Input
            type='text'
            name='card_name'
            label='addCardName'
            placeholder='exampleCardName'
          />
          <Select
            label='typeCard'
            name='card_type'
            options={cardTypeOptions}
            placeholder='choiceTypeCard'
          />
          <div className='mb-6 flex flex-col gap-5 md:mb-0 md:flex-row md:gap-8'>
            <div className='w-full md:w-1/2'>
              {values.card_type === 'emv_card' ? (
                <CardInput
                  name='card_number'
                  label='numberCard'
                  firstMax={6}
                  secondMax={4}
                />
              ) : (
                <Input
                  type='text'
                  name='card_number'
                  label='numberCard'
                  placeholder='numberCardSix'
                />
              )}
            </div>
            <div className='w-full md:w-1/2'>
              {values.card_type === 'emv_card' ? (
                <ExpirationDateInput
                  type='text'
                  name='card_expiration_date'
                  label='expirationDateCard'
                  placeholder='exampleExpirationDateCard'
                />
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
