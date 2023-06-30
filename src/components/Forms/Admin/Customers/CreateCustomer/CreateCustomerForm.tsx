import useTranslation from 'next-translate/useTranslation';

import { peselOptions } from '@/lib/options/options';
import { phonePrefixOptions } from '@/lib/options/phonePrefix';

import { DatePickerInput } from '@/components/commons/Form/Fields/DatepickerInput';
import { Input } from '@/components/commons/Form/Fields/Input';
import { PhonePrefixSelect } from '@/components/commons/Form/Fields/PhonePrefixSelect/PhonePrefixSelect';
import { Select } from '@/components/commons/Form/Fields/Select/Select';
import { SubmitButton } from '@/components/commons/Form/Fields/SubmitButton';
import { Form } from '@/components/commons/Form/Form';
import { FormMessage } from '@/components/commons/Form/FormMessage';
import { FormProps } from '@/components/Forms/@types/Form';

import { useCreateCustomerForm } from './useCreateCustomerForm';

//TODO errors fixed

export const CreateCustomerForm = (props: FormProps) => {
  const { t } = useTranslation('common');
  const { form, error, isLoading } = useCreateCustomerForm(props);

  return (
    <Form {...{ form, className: 'gap-3' }}>
      <div className='w-full min-w-fit'>
        <div className='flex max-w-[832px] flex-col gap-7'>
          <h1 className='pt-8 text-2xl font-normal'>
            {t('auth.register.formDataTitle')}
          </h1>
          <div className='flex flex-col gap-2'>
            <div className='flex w-full flex-row gap-x-8'>
              <div className='w-1/2 min-w-inputModal'>
                <Input
                  label='first_name*'
                  name='first_name'
                  type='text'
                  placeholder='first_name'
                />
              </div>
              <div className='w-1/2 min-w-inputModal'>
                <Input
                  label='last_name*'
                  name='last_name'
                  type='text'
                  placeholder='last_name'
                />
              </div>
            </div>
            <div className='flex w-full flex-row gap-x-8'>
              <div className='w-1/2 min-w-inputModal'>
                <Select
                  label='havePesel*'
                  name='havePesel'
                  placeholder='yesOrNo'
                  options={peselOptions}
                />
              </div>
              <div className='w-1/2 min-w-inputModal'>
                {form.values.havePesel === 'TAK' && (
                  <Input
                    label='pesel*'
                    name='pesel'
                    type='text'
                    placeholder='typePesel'
                  />
                )}
              </div>
            </div>
            <div className='flex w-full flex-row gap-x-8'>
              <div className='w-1/2 min-w-inputModal'>
                <DatePickerInput
                  name='birthday_date'
                  label='birthday_date*'
                  placeholder='typeBirthday_date'
                  isFutureDate={false}
                  minYear={100}
                />
              </div>
              <div className='w-full md:w-1/2'></div>
            </div>
            <div className='flex w-full flex-col gap-x-8 md:flex-row'>
              <div className='w-full md:w-1/2'>
                <PhonePrefixSelect
                  label='telephone_prefix*'
                  name='telephone_prefix'
                  options={phonePrefixOptions}
                />
              </div>
              <div className='w-full md:w-1/2'>
                <Input
                  label='telephone*'
                  name='telephone'
                  type='text'
                  placeholder='typeTelephone'
                />
              </div>
            </div>
            <h1 className='pt-5 pb-5 text-2xl font-normal'>Konto</h1>
            <div className='flex w-full flex-col gap-x-8 md:flex-row'>
              <div className='w-full md:w-1/2'>
                <Input
                  label='email*'
                  name='email'
                  type='email'
                  placeholder='email'
                />
              </div>
              <div className='w-full md:w-1/2'>
                <Input
                  label='emailRepeat*'
                  name='email_confirmation'
                  type='email'
                  placeholder='emailRepeat'
                />
              </div>
            </div>
            <div className='pb-5'>
              <p className='py-2.5 text-sm leading-6 text-gray'>
                (*) - pola wymagane
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='flex justify-center pb-14'>
        <SubmitButton label='createAccount' loading={isLoading} />
        <FormMessage type='error' content={error} />
      </div>
    </Form>
  );
};
