import { FormikContextType, FormikValues, useFormikContext } from 'formik';

import { clsxm } from '@/lib';
import { yesNoOptions } from '@/lib/options/options';
import { phonePrefixOptions } from '@/lib/options/phonePrefix';

import { DatePickerInput } from '@/components/commons/Form/Fields/DatepickerInput';
import { Input } from '@/components/commons/Form/Fields/Input';
import { PhonePrefixSelect } from '@/components/commons/Form/Fields/PhonePrefixSelect/PhonePrefixSelect';
import { Select } from '@/components/commons/Form/Fields/Select/Select';

export const UserData = () => {
  const { values }: FormikContextType<FormikValues> = useFormikContext();

  return (
    <div className='mx-auto flex w-full flex-col gap-5 pb-2 md:w-2/3'>
      <div className='flex w-full flex-col gap-5 md:flex-row md:gap-8'>
        <div className='w-full md:w-1/2'>
          <Input
            type='text'
            name='first_name'
            label='first_name*'
            placeholder='typeFirst_name'
          />
        </div>
        <div className='w-full md:w-1/2'>
          <Input
            type='text'
            name='last_name'
            label='last_name*'
            placeholder='typeLast_name'
          />
        </div>
      </div>
      <div className='flex w-full flex-col gap-5 md:flex-row md:gap-8'>
        <div
          className={clsxm(
            'w-full md:w-1/2',
            values.is_pesel !== '1' && 'md:pr-4'
          )}
        >
          <Select
            label='havePesel*'
            name='is_pesel'
            placeholder='yesOrNo'
            options={yesNoOptions}
          />
        </div>
        {values.is_pesel === '1' ? (
          <div className='w-full md:w-1/2'>
            <Input
              type='text'
              name='pesel'
              label='pesel*'
              placeholder='typePesel'
            />
          </div>
        ) : null}
      </div>
      <div className='flex w-full flex-col gap-5 md:flex-row md:gap-8'>
        <div className='w-full pr-0 md:w-1/2 md:pr-4'>
          <DatePickerInput
            name='birthday_date'
            label='birthday_date*'
            placeholder='typeBirthday_date'
            isFutureDate={false}
            minYear={100}
          />
        </div>
      </div>
      <div className='flex flex-col gap-5 pb-6 md:flex-row md:gap-8 md:pb-0'>
        <div className='w-full md:w-1/2'>
          <PhonePrefixSelect
            label='telephone_prefix'
            name='telephone_prefix'
            options={phonePrefixOptions}
          />
        </div>
        <div className='w-full md:w-1/2'>
          <Input
            label='telephone'
            name='telephone'
            placeholder='typeTelephone'
          />
        </div>
      </div>
      <div className='flex flex-col gap-5 pb-6 md:flex-row md:gap-8 md:pb-0'>
        <div className='w-full md:w-1/2 md:pr-4'>
          <Input label='email' name='email' type='email' placeholder='email' />
        </div>
      </div>
    </div>
  );
};
