import { Input } from '@/components/commons/Form/Fields/Input';
import { SubmitButton } from '@/components/commons/Form/Fields/SubmitButton';
import { Form } from '@/components/commons/Form/Form';
import { FormMessage } from '@/components/commons/Form/FormMessage';
import { FormProps } from '@/components/Forms/@types/Form';

import { useResetPasswordForm } from './useResetPasswordForm';

export const ResetPasswordForm = (props: FormProps) => {
  const { form, isLoading, error } = useResetPasswordForm(props);

  return (
    <Form {...{ form, className: 'flex flex-col gap-0 md:gap-3' }}>
      <Input name='email' type='email' placeholder='emailOrId' />
      <SubmitButton label='resetPassword' loading={isLoading} />
      <FormMessage content={error} type='error' />
    </Form>
  );
};
