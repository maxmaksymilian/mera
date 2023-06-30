import * as Yup from 'yup';

import { validationSchema, ValidationSchemaType } from '@/lib/validation';

export const adminCreateValidationSchema = Yup.object({
  first_name: validationSchema.global.required,
  last_name: validationSchema.global.required,
  email: validationSchema.email,
  telephone: validationSchema.telephone,
  status: validationSchema.global.required,
  role: validationSchema.role,
});

export const initialValues: ValidationSchemaType<
  typeof adminCreateValidationSchema
> = {
  first_name: '',
  last_name: '',
  email: '',
  telephone: '',
  status: '',
  role: [],
};
