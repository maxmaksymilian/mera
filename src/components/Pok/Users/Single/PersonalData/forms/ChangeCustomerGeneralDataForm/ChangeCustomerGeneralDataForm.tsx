import { Button } from '@/components/commons/Button';
import { Input } from '@/components/commons/Form/Fields/Input';
import { SubmitButton } from '@/components/commons/Form/Fields/SubmitButton';
import { Form } from '@/components/commons/Form/Form';
import { FormMessage } from '@/components/commons/Form/FormMessage';
import { ProfileType } from '@/components/panel/MyData/MyDataPageContent';

import { useChangeCustomerGeneralDataForm } from './useChangeCustomerGeneralDataForm';

export type ChangeCustomerGeneralDataFormProps = {
  id: string;
  profile: ProfileType;
  type?: string;
  handleClose: () => void;
  handleRefresh: () => void;
};

export const ChangeCustomerGeneralDataForm = ({
  id,
  profile,
  handleClose,
  handleRefresh,
}: ChangeCustomerGeneralDataFormProps) => {
  const { error, form, isLoading, t } = useChangeCustomerGeneralDataForm({
    id,
    profile,
    handleClose,
    handleRefresh,
  });

  const inputs = ['first_name', 'last_name', 'pesel', 'email', 'telephone'];

  return (
    <Form {...{ form, id: 'change-general-data-form' }}>
      {error && <FormMessage type='error' content={error} />}
      <div className='form-content mx-auto py-10 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-4'>
        {inputs.map((item, index) => (
          <div key={index} className='relative pb-2.5 md:pb-0'>
            <Input label={item === 'pesel' ? item : item + '*'} name={item} />
          </div>
        ))}
      </div>
      <p>(*) - {t('requiredFields')}</p>
      <div className='mt-7 flex items-center justify-center gap-x-2.5'>
        <Button type='button' variant='secondary' handleClick={handleClose}>
          {t('cancel')}
        </Button>
        <SubmitButton loading={isLoading} label='saveChanges' />
      </div>
    </Form>
  );
};
