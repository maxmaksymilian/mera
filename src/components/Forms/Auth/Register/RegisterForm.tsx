import { Form } from '@/components/commons/Form/Form';
import { FormProps } from '@/components/Forms/@types/Form';

import { Fields } from './components/Fields';
import { Terms } from './components/Terms';
import { useRegisterForm } from './useRegisterForm';

export const RegisterForm = (props: FormProps) => {
  const { form, errors, isLoading } = useRegisterForm(props);

  return (
    <Form {...{ form, className: 'flex flex-col gap-3' }}>
      <div className='w-full items-stretch lg:flex'>
        <Fields />
        <Terms {...{ errors, isLoading }} />
      </div>
    </Form>
  );
};
