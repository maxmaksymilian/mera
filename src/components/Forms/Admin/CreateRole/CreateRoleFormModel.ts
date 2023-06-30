import * as Yup from 'yup';

import { validationSchema, ValidationSchemaType } from '@/lib/validation';

export const roleCreateValidationSchema = Yup.object({
  name: validationSchema.global.required,
  status: validationSchema.global.required,
  permission: validationSchema.role,
});

export const initialValues: ValidationSchemaType<
  typeof roleCreateValidationSchema
> = {
  name: '',
  status: '',
  permission: [],
};
