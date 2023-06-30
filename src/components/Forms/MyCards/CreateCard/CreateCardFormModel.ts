import * as Yup from 'yup';

import { validationSchema, ValidationSchemaType } from '@/lib/validation';

export const createCardValidationSchema = Yup.object({
  user: validationSchema.global.required,
  status: validationSchema.global.required,
  type: validationSchema.card.type,
  name: validationSchema.card.name,
  number: validationSchema.card.number,
  expiration_date: validationSchema.card.expiration_date,
});

export const initialValues: ValidationSchemaType<
  typeof createCardValidationSchema
> = {
  user: '',
  status: 'active',
  type: 'emv_card',
  name: '',
  number: '',
  expiration_date: '',
};
