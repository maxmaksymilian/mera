import { CodeInput } from '@/components/commons/Form/Fields/CodeInput';
import { SubmitButton } from '@/components/commons/Form/Fields/SubmitButton';
import { Form } from '@/components/commons/Form/Form';
import { FormMessage } from '@/components/commons/Form/FormMessage';
import { FormProps } from '@/components/Forms/@types/Form';

import { useUpdatePasswordForm } from './useCodeUpdatePassword';

export type CodeUpdatePasswordFormType = {
  token: string;
  email: string;
  password: string;
  password_confirmation: string;
} & FormProps;

export const CodeUpdatePasswordForm = ({
  ...props
}: CodeUpdatePasswordFormType) => {
  const { form, isLoading, error } = useUpdatePasswordForm({ ...props });

  return (
    <Form {...{ form, className: 'flex flex-col gap-3' }}>
      <div className='mb-8 lg:mb-12'>
        <CodeInput label='codeType' name='code' fields={5} />
      </div>
      <SubmitButton
        type='submit'
        label='confirmChangePassword'
        loading={isLoading}
      />
      <FormMessage content={error} type='error' />
    </Form>
  );
};
