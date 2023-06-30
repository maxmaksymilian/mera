import * as Yup from 'yup';

import { validationSchema, ValidationSchemaType } from '@/lib/validation';

export const loginValidationSchema = Yup.object({
  email: validationSchema.email,
  password: validationSchema.global.required,
});

export const initialValues: ValidationSchemaType<typeof loginValidationSchema> =
  {
    email: '',
    password: '',
  };
