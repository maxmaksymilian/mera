import * as Yup from 'yup';

import { validationSchema, ValidationSchemaType } from '@/lib/validation';

export const createUserValidationSchema = [
  Yup.object({
    first_name: validationSchema.global.required,
    last_name: validationSchema.global.required,
    is_pesel: validationSchema.global.required,
    pesel: validationSchema.pesel,
    birthday_date: validationSchema.global.required,
    email: validationSchema.global.email,
    telephone: validationSchema.global.telephone,
    telephone_prefix: validationSchema.global.required,
  }),
  Yup.object({
    card: validationSchema.global.required,
    card_name: validationSchema.user.card.name,
    card_type: validationSchema.user.card.type,
    card_number: validationSchema.user.card.number,
    card_expiration_date: validationSchema.user.card.expiration_date,
  }),
];

export const initialValues: ValidationSchemaType<
  (typeof createUserValidationSchema)[0]
> &
  ValidationSchemaType<(typeof createUserValidationSchema)[1]> = {
  first_name: '',
  last_name: '',
  birthday_date: '',
  telephone_prefix: '+48',
  is_pesel: '1',
  pesel: '',
  telephone: '',
  email: '',
  card: '0',
  card_name: '',
  card_type: '',
  card_number: '',
  card_expiration_date: '',
};

export const stepsData = [
  {
    header: 'userData',
    title: 'Dodaj nowego użytkownika',
    content: `Dodaj użytkownika do swojego Konta.`,
  },
  {
    header: 'choiceCard',
    title: 'Dodaj nowego użytkownika',
    content: `Dodaj użytkownika do swojego Konta.`,
  },
  {
    header: 'summary',
    title: 'Dodaj nowego użytkownika',
    content: `Dodaj użytkownika do swojego Konta.`,
  },
];
