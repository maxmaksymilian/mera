import { useFormikContext } from 'formik';
import useTranslation from 'next-translate/useTranslation';

import { peselOptions } from '@/lib/options/options';
import { phonePrefixOptions } from '@/lib/options/phonePrefix';
import { ValidationSchemaType } from '@/lib/validation';

import { DatePickerInput } from '@/components/commons/Form/Fields/DatepickerInput';
import { Input } from '@/components/commons/Form/Fields/Input';
import { PhonePrefixSelect } from '@/components/commons/Form/Fields/PhonePrefixSelect/PhonePrefixSelect';
import { Select } from '@/components/commons/Form/Fields/Select/Select';
import { PasswordValidation } from '@/components/commons/Form/Validation/Password';
import { registerValidationSchema } from '@/components/Forms/Auth/Register/RegisterFormModel';

export const Fields = () => {
  const { t } = useTranslation('common');
  const {
    values,
  }: { values: ValidationSchemaType<typeof registerValidationSchema> } =
    useFormikContext();

  return (
    <div className='w-full px-0 md:px-9 lg:flex lg:w-1/2 lg:items-center lg:justify-end lg:px-0'>
      <div className='w-full lg:max-w-[620px]'>
        <div className='mx-auto flex max-w-[620px] flex-col gap-12 pt-5 lg:mx-0 lg:pt-0'>
          <h1 className='pt-0 text-2xl font-normal md:text-lg lg:pt-8'>
            {t('auth.register.formDataTitle')}
          </h1>
          <div className='flex flex-col gap-2'>
            <div className='flex w-full flex-col gap-x-8 md:flex-row'>
              <div className='w-full md:w-1/2'>
                <Input
                  label='first_name*'
                  name='first_name'
                  type='text'
                  placeholder='first_name'
                />
              </div>
              <div className='w-full md:w-1/2'>
                <Input
                  label='last_name*'
                  name='last_name'
                  type='text'
                  placeholder='last_name'
                />
              </div>
            </div>
            <div className='flex w-full flex-col gap-x-8 md:flex-row'>
              <div className='w-full md:w-1/2 md:max-w-[294px]'>
                <Select
                  label='havePesel*'
                  name='havePesel'
                  placeholder='yesOrNo'
                  options={peselOptions}
                />
              </div>
              <div className='w-full md:w-1/2'>
                {values.havePesel === 'TAK' && (
                  <Input
                    label='pesel*'
                    name='pesel'
                    type='text'
                    placeholder='typePesel'
                  />
                )}
              </div>
            </div>
            <div className='flex w-full flex-col gap-x-8 md:flex-row'>
              <div className='w-full md:w-1/2'>
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
            <h1 className='pt-8 pb-5 text-2xl font-normal md:text-lg'>Konto</h1>
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
            <div className='flex w-full flex-col gap-x-8 md:flex-row'>
              <div className='w-full md:w-1/2'>
                <Input
                  label='passwordType*'
                  name='password'
                  type='password'
                  placeholder='passwordType'
                />
              </div>
              <div className='w-full md:w-1/2'>
                <Input
                  label='passwordRepeat*'
                  name='password_confirmation'
                  type='password'
                  placeholder='passwordRepeat'
                />
              </div>
            </div>
            <div className='pb-5'>
              <p className='py-2.5 text-sm leading-6 text-gray'>
                (*) - pola wymagane
              </p>
              <PasswordValidation name='password' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
