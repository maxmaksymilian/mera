import * as Yup from 'yup';

import { validationSchema, ValidationSchemaType } from '@/lib/validation';

export const updatePasswordValidationSchema = Yup.object({
  old_password: validationSchema.password,
  password: validationSchema.password,
  password_confirmation: validationSchema.password_confirmation,
});

export const initialValues: ValidationSchemaType<
  typeof updatePasswordValidationSchema
> = {
  old_password: '',
  password: '',
  password_confirmation: '',
};
