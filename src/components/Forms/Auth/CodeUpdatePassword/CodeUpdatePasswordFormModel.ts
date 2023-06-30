import * as Yup from 'yup';

import { validationSchema, ValidationSchemaType } from '@/lib/validation';

export const codeUpdatePasswordValidationSchema = Yup.object({
  code: validationSchema.global.required,
});

export const initialValues: ValidationSchemaType<
  typeof codeUpdatePasswordValidationSchema
> = {
  code: '',
};
