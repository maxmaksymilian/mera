import { documentTypeOptions } from '@/lib/options/options';

import { Input } from '@/components/commons/Form/Fields/Input';
import { RadioBox } from '@/components/commons/Form/Fields/RadioBox';
import { Select } from '@/components/commons/Form/Fields/Select/Select';
import { usePayment } from '@/components/Forms/Tickets/Order/Steps/Payment/usePayment';

export const Payment = () => {
  const { values, t } = usePayment();

  return (
    <div className='pb-[50px] md:pb-0'>
      <p className='pb-14 text-2xl font-bold'>{t('paymentMethod')}</p>
      <div className='flex gap-5 pb-14'>
        <RadioBox name='payment_method' value='cash'>
          <p className='text-base text-black'>{t('label.cash')}</p>
        </RadioBox>
        <RadioBox name='payment_method' value='card'>
          <p className='text-base text-black'>{t('label.creditCard')}</p>
        </RadioBox>
      </div>
      <p className='pb-5 text-2xl font-bold'>{t('transactionDocument')}</p>
      <Select
        name='document_type'
        label='setType'
        placeholder='setType'
        options={documentTypeOptions}
        className='mb-2'
      />
      {values.document_type === 'invoice' && (
        <div className='flex flex-col gap-2'>
          <Input
            name='company_name'
            label={t('companyName')}
            placeholder={t('companyName')}
          />
          <div className='flex gap-6'>
            <Input
              name='company_nip'
              label='nip'
              placeholder='nip'
              className='min-w-xs'
            />
            <Input
              name='address_street'
              label='street'
              placeholder='street'
              className='min-w-sm'
            />
            <Input
              name='address_number'
              label='addressNumber'
              className='w-20'
            />
          </div>
          <div className='flex gap-6'>
            <Input
              label='zip'
              name='address_zip'
              placeholder='zip'
              className='min-w-xs'
            />
            <Input
              name='address_city'
              label='city'
              placeholder='city'
              className='min-w-sm'
            />
          </div>
        </div>
      )}
    </div>
  );
};
