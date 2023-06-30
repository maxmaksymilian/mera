import * as Yup from 'yup';

import { validationSchema, ValidationSchemaType } from '@/lib/validation';

export const resetPasswordValidationSchema = Yup.object({
  email: validationSchema.email,
});

export const initialValues: ValidationSchemaType<
  typeof resetPasswordValidationSchema
> = {
  email: '',
};
