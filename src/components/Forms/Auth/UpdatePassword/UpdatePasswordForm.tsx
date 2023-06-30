import { Input } from '@/components/commons/Form/Fields/Input';
import { SubmitButton } from '@/components/commons/Form/Fields/SubmitButton';
import { Form } from '@/components/commons/Form/Form';
import { FormMessage } from '@/components/commons/Form/FormMessage';
import { PasswordValidation } from '@/components/commons/Form/Validation/Password';
import { FormProps } from '@/components/Forms/@types/Form';

import { useUpdatePasswordForm } from './useUpdatePassword';

export type UpdatePasswordFormType = {
  token: string;
  email: string;
} & FormProps;

export const UpdatePasswordForm = ({ ...props }: UpdatePasswordFormType) => {
  const { form, isLoading, error } = useUpdatePasswordForm({ ...props });

  return (
    <Form {...{ form, className: 'flex flex-col gap-3' }}>
      <Input
        label='oldPasswordType'
        name='old_password'
        type='password'
        placeholder='passwordType'
      />
      <Input
        label='passwordType'
        name='password'
        type='password'
        placeholder='passwordType'
      />
      <Input
        label='passwordRepeat'
        name='password_confirmation'
        type='password'
        placeholder='passwordRepeat'
      />
      <SubmitButton type='submit' label='changePassword' loading={isLoading} />
      <FormMessage content={error} type='error' />
      <PasswordValidation name='password' />
    </Form>
  );
};
