import { Button } from '@/components/commons/Button';
import { Input } from '@/components/commons/Form/Fields/Input';
import { SubmitButton } from '@/components/commons/Form/Fields/SubmitButton';
import { Form } from '@/components/commons/Form/Form';
import { FormMessage } from '@/components/commons/Form/FormMessage';
import { ProfileType } from '@/components/panel/MyData/MyDataPageContent';

import { useChangeGeneralDataForm } from './useChangeGeneralDataForm';

export type ChangeGeneralDataFormProps = {
  profile: ProfileType;
  type?: string;
  handleClose: () => void;
  handleRefresh: () => void;
};

export const ChangeGeneralDataForm = ({
  profile,
  handleClose,
  handleRefresh,
}: ChangeGeneralDataFormProps) => {
  const { error, form, isLoading, t } = useChangeGeneralDataForm({
    profile,
    handleClose,
    handleRefresh,
  });

  return (
    <Form {...{ form, id: 'change-general-data-form' }}>
      {error && <FormMessage type='error' content={error} />}
      <div className='form-content mx-auto py-10 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-4'>
        <div className='relative pb-2.5 md:pb-0'>
          <Input label='first_name' name='first_name' />
        </div>
        <div className='relative pb-2.5 md:pb-0'>
          <Input label='last_name' name='last_name' />
        </div>
        <div className='relative pb-2.5 md:pb-0'>
          <Input label='pesel' name='pesel' />
        </div>
        <div className='relative pb-2.5 md:pb-0'>
          <Input label='email' name='email' />
        </div>
        <div className='relative pb-2.5 md:pb-0'>
          <Input label='telephone' name='telephone' />
        </div>
      </div>
      <div className='mt-7 flex items-center justify-center gap-x-2.5'>
        <Button type='button' variant='secondary' handleClick={handleClose}>
          {t('cancel')}
        </Button>
        <SubmitButton loading={isLoading} label='saveChanges' />
      </div>
    </Form>
  );
};
