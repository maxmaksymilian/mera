import * as Yup from 'yup';

import { validationSchema, ValidationSchemaType } from '@/lib/validation';

export const registerValidationSchema = Yup.object({
  first_name: validationSchema.global.required,
  last_name: validationSchema.global.required,
  havePesel: validationSchema.yesOrNo,
  pesel: validationSchema.pesel,
  birthday_date: validationSchema.date,
  telephone: validationSchema.telephone,
  telephone_prefix: validationSchema.global.required,
  email: validationSchema.email,
  email_confirmation: validationSchema.email_confirmation,
  password: validationSchema.password,
  password_confirmation: validationSchema.password_confirmation,
  customAgreement1: validationSchema.global.checkbox,
  customAgreement2: validationSchema.global.checkbox,
  termsAgreement: validationSchema.terms,
});

export const initialValues: ValidationSchemaType<
  typeof registerValidationSchema
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
  password: '',
  password_confirmation: '',
  customAgreement1: '0',
  customAgreement2: '0',
  termsAgreement: '0',
};
