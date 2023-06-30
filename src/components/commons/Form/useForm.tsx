import { FormikConfig, FormikValues, useFormik } from 'formik';

export type useFormSubmit = (values: FormikValues) => void;

export type useFormType = {
  onSubmit?: useFormSubmit;
  clearForm?: boolean;
} & FormikConfig<FormikValues>;

export const useForm = ({ onSubmit, clearForm, ...formProps }: useFormType) =>
  useFormik({
    ...formProps,
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      onSubmit(values);
      setSubmitting(false);
      if (clearForm) {
        resetForm();
      }
    },
  });
