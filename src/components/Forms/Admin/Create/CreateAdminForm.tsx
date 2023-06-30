import useTranslation from 'next-translate/useTranslation';

import { globalStatusOptions } from '@/lib/options/options';

import { Button } from '@/components/commons/Button';
import { Checkbox } from '@/components/commons/Form/Fields/Checkbox';
import { Input } from '@/components/commons/Form/Fields/Input';
import { Select } from '@/components/commons/Form/Fields/Select/Select';
import { SubmitButton } from '@/components/commons/Form/Fields/SubmitButton';
import { Form } from '@/components/commons/Form/Form';
import { FormMessage } from '@/components/commons/Form/FormMessage';
import { Link } from '@/components/commons/Link';
import { FormProps } from '@/components/Forms/@types/Form';

import { useCreateAdminForm } from './useCreateAdminForm';

export const CreateAdminForm = (props: FormProps) => {
  const { t } = useTranslation();
  const { form, error, isLoading, roles } = useCreateAdminForm(props);

  return (
    <Form {...{ form, className: 'gap-3' }}>
      <div className='flex w-full min-w-fit flex-col gap-6'>
        <FormMessage type='error' content={error} />
        <div className='flex w-full min-w-fit gap-8'>
          <div className='w-[calc((100%_-_64px)_/_3)]'>
            <Input
              label='email*'
              name='email'
              type='text'
              placeholder='email'
            />
          </div>
          <div className='w-[calc((100%_-_64px)_/_3)]'>
            <Input
              label='first_name*'
              name='first_name'
              type='text'
              placeholder='first_name'
            />
          </div>
          <div className='w-[calc((100%_-_64px)_/_3)]'>
            <Input
              label='last_name*'
              name='last_name'
              type='text'
              placeholder='last_name'
            />
          </div>
        </div>
        <div className='flex gap-8'>
          <div className='w-[calc((100%_-_32px)_/_3)]'>
            <Input
              label='telephone*'
              name='telephone'
              type='text'
              placeholder='telephone'
            />
          </div>
          <div className='w-[calc((100%_-_32px)_*_2/3)]'>
            <Select
              label='status'
              name='status'
              options={globalStatusOptions}
              placeholder='status'
              isClear
              clearLabel='clear'
            />
          </div>
        </div>
        <div className='flex flex-col gap-10 pt-6'>
          <p className='text-base font-bold leading-6'>
            {t('form:label.permissions')}
          </p>
          <div className='flex justify-between gap-8'>
            {roles.map(({ id, name }) => (
              <Checkbox key={id} name='role' multiple value={id}>
                {name}
              </Checkbox>
            ))}
          </div>
        </div>
      </div>
      <div className='flex justify-center gap-4 pb-14 pt-14'>
        <Link href='/pok/administracja/uzytkownicy'>
          <Button variant='secondary'>{t('common:cancel')}</Button>
        </Link>
        <SubmitButton label='saveAdmin' loading={isLoading} />
      </div>
    </Form>
  );
};
