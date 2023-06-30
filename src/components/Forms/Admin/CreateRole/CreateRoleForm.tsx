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

import { useCreateRoleForm } from './useCreateRoleForm';

export const CreateRoleForm = (props: FormProps) => {
  const { t } = useTranslation();
  const { form, error, isLoading, permissions } = useCreateRoleForm(props);

  return (
    <Form {...{ form, className: 'gap-3' }}>
      <div className='flex w-full min-w-fit flex-col gap-6'>
        <FormMessage type='error' content={error} />
        <div className='flex gap-8'>
          <div className='w-[calc((100%_-_32px)_/_3)]'>
            <Input
              label='typeName*'
              name='name'
              type='text'
              placeholder='typeRoleName'
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
          <div className='flex flex-col justify-start gap-8'>
            {permissions.map(({ id, name }) => (
              <Checkbox key={id} name='permission' multiple value={id}>
                {t(`form:permission.${name}`)}
              </Checkbox>
            ))}
          </div>
        </div>
      </div>
      <div className='flex justify-center gap-4 pb-14 pt-14'>
        <Link href='/pok/administracja/uzytkownicy'>
          <Button variant='secondary'>{t('common:cancel')}</Button>
        </Link>
        <SubmitButton label='saveRole' loading={isLoading} />
      </div>
    </Form>
  );
};
