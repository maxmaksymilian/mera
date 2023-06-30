import { Input } from '@/components/commons/Form/Fields/Input';
import { SubmitButton } from '@/components/commons/Form/Fields/SubmitButton';
import { Form } from '@/components/commons/Form/Form';
import { FormMessage } from '@/components/commons/Form/FormMessage';
import { FormProps } from '@/components/Forms/@types/Form';

import { useLoginForm } from './useLoginForm';

export const LoginForm = (props: FormProps) => {
  const { form, error, isLoading } = useLoginForm(props);

  return (
    <Form {...{ form, className: 'flex flex-col gap-0 md:gap-3' }}>
      <Input name='email' type='email' placeholder='emailOrId' />
      <div className='mt-3 md:mt-0'>
        <Input name='password' type='password' placeholder='password' />
      </div>
      <SubmitButton label='login' loading={isLoading} />
      <FormMessage content={error} type='error' />
    </Form>
  );
};
