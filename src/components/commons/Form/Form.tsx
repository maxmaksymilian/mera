import { FormikContextType, FormikProvider, FormikValues } from 'formik';
import { PropsWithChildren } from 'react';

import { useFormType } from './useForm';

export type FormType = {
  className?: string;
  form: FormikContextType<FormikValues>;
} & Pick<useFormType, 'children'> &
  PropsWithChildren;

export const Form = ({ children, className, form }: FormType) => {
  return (
    <FormikProvider value={form}>
      <form onSubmit={form.handleSubmit}>
        <fieldset disabled={form.isSubmitting} className={className}>
          {children}
        </fieldset>
      </form>
    </FormikProvider>
  );
};
