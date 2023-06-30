import * as Yup from 'yup';

import { validationSchema, ValidationSchemaType } from '@/lib/validation';

export const customerCreateValidationSchema = Yup.object({
  first_name: validationSchema.global.required,
  last_name: validationSchema.global.required,
  havePesel: validationSchema.yesOrNo,
  pesel: validationSchema.pesel,
  birthday_date: validationSchema.date,
  telephone: validationSchema.global.telephone,
  telephone_prefix: validationSchema.global.required,
  email: validationSchema.email,
  email_confirmation: validationSchema.email_confirmation,
});

export const initialValues: ValidationSchemaType<
  typeof customerCreateValidationSchema
> = {
  first_name: '',
  last_name: '',
  havePesel: 'TAK',
  pesel: '',
  birthday_date: '',
  telephone: '',
  telephone_prefix: '+48',
  email: '',
  email_confirmation: '',
};
