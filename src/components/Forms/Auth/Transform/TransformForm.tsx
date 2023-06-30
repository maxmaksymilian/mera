import { Input } from '@/components/commons/Form/Fields/Input';
import { SubmitButton } from '@/components/commons/Form/Fields/SubmitButton';
import { Form } from '@/components/commons/Form/Form';
import { FormMessage } from '@/components/commons/Form/FormMessage';
import { PasswordValidation } from '@/components/commons/Form/Validation/Password';
import { FormProps } from '@/components/Forms/@types/Form';

import { useTransformForm } from './useTransformForm';

export type TransformFormType = {
  token: string;
} & FormProps;

export const TransformForm = (props: TransformFormType) => {
  const { form, isLoading, error } = useTransformForm(props);

  return (
    <div className='flex flex-col gap-12'>
      <Form {...{ form, className: 'flex flex-col gap-3' }}>
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
        <SubmitButton loading={isLoading} label='saveChanges' type='submit' />
        <FormMessage content={error} type='error' />
        <PasswordValidation name='password' />
      </Form>
    </div>
  );
};
