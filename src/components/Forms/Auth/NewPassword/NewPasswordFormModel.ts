import * as Yup from 'yup';

import { validationSchema, ValidationSchemaType } from '@/lib/validation';

export const newPasswordValidationSchema = Yup.object({
  password: validationSchema.password,
  password_confirmation: validationSchema.password_confirmation,
});

export const initialValues: ValidationSchemaType<
  typeof newPasswordValidationSchema
> = {
  password: '',
  password_confirmation: '',
};
