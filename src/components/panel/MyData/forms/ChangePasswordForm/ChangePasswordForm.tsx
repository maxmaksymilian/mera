import { PasswordValidation } from '@/components/commons/Fields';
import { Input } from '@/components/commons/Form/Fields/Input';
import { SubmitButton } from '@/components/commons/Form/Fields/SubmitButton';
import { Form } from '@/components/commons/Form/Form';
import { FormMessage } from '@/components/commons/Form/FormMessage';

import { useChangePasswordForm } from './useChangePasswordForm';

type ChangePasswordFormProps = {
  handleClose: () => void;
};

export const ChangePasswordForm = ({
  handleClose,
}: ChangePasswordFormProps) => {
  const { error, form, isLoading } = useChangePasswordForm({
    handleClose,
  });

  return (
    <Form {...{ id: 'change-password-form', form }}>
      {error && <FormMessage type='error' content={error} />}
      <div className='form-content mx-auto flex flex-col gap-10 py-10 md:grid md:grid-cols-2 md:gap-0'>
        <div className='flex flex-col gap-y-2 md:pr-10'>
          <div className='relative'>
            <Input label='password' name='current_password' type='password' />
          </div>
          <div className='relative'>
            <Input label='newPassword' name='password' type='password' />
          </div>
          <div className='relative'>
            <Input
              label='passwordRepeat'
              name='password_confirmation'
              type='password'
            />
          </div>
        </div>
        <div>
          <PasswordValidation value={form.values.password} />
        </div>
      </div>
      <div className='flex items-center justify-center'>
        <SubmitButton label='saveChanges' loading={isLoading} />
      </div>
    </Form>
  );
};
