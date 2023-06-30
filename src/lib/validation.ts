import * as Yup from 'yup';
import YupPassword from 'yup-password';

import { documentTypeOptions } from './options/options';

YupPassword(Yup);

export type ValidationSchemaType<Y extends Yup.AnySchema> = Yup.InferType<Y>;

const cardTypes = ['city_card', 'emv_card', 'student_card'];

export const validationSchema = {
  global: {
    email: Yup.string().email('email.invalid'),
    telephone: Yup.string().matches(/^\d{9}$/gi, 'phone.notMatch'),
    string: Yup.string(),
    required: Yup.string().required('required'),
    checkbox: Yup.string().oneOf(['1', '0'], 'required'),
    array: Yup.object(),
    nip: Yup.string().matches(/^[0-9]{10}$/gi, 'company.nip'),
  },
  case: {
    title: Yup.string()
      .min(4, 'case.title.min')
      .max(255, 'case.title.max')
      .required('case.title.required'),
    description: Yup.string()
      .min(10, 'case.description.min')
      .max(1000, 'case.description.max')
      .required('case.description.required'),
  },
  user: {
    card: {
      name: Yup.string().when('card', {
        is: '1',
        then: (schema) =>
          schema
            .required('required')
            .min(5, 'card.name.min')
            .max(35, 'card.name.max'),
      }),
      type: Yup.string().when('card', {
        is: '1',
        then: (schema) =>
          schema.oneOf(cardTypes).required(`card.type.required`),
      }),
      number: Yup.string().when('card', {
        is: '1',
        then: (schema) =>
          schema
            .required('card.number.required')
            .when('card_type', {
              is: 'emv_card',
              then: (schema) =>
                schema.matches(/^\d{10}$/gi, 'card.number.emvCardMatch'),
            })
            .when('card_type', {
              is: 'student_card',
              then: (schema) =>
                schema.matches(/^\d{6}$/gi, 'card.number.studentCardMatch'),
            }),
      }),
      expiration_date: Yup.string().when('card', {
        is: '1',
        then: (schema) =>
          schema
            .when('card_type', {
              is: 'emv_card',
              then: (schema) =>
                schema
                  .matches(
                    /^(0[1-9]|1[0-2])\/\d{2}$/,
                    'card.expiration_date.match'
                  )
                  .required('card.expiration_date.required'),
            })
            .when('card_type', {
              is: 'student_card',
              then: (schema) =>
                schema
                  .matches(
                    /^(0[1-9]|1[0-2])\/\d{2}$/,
                    'card.expiration_date.match'
                  )
                  .required('card.expiration_date.required'),
            }),
      }),
    },
  },
  card: {
    type: Yup.string().oneOf(cardTypes).required(`card.type.required`),
    name: Yup.string()
      .required('required')
      .min(5, 'card.name.min')
      .max(35, 'card.name.max'),
    number: Yup.string()
      .required('card.number.required')
      .when('type', {
        is: 'emv_card',
        then: (schema) =>
          schema.matches(/^\d{10}$/gi, 'card.number.emvCardMatch'),
      })
      .when('type', {
        is: 'city_card',
        then: (schema) =>
          schema.matches(/^\d{6}$/gi, 'card.number.studentCardMatch'),
      })
      .when('type', {
        is: 'city_card',
        then: (schema) =>
          schema
            .required('required')
            .min(3, 'card.number.cityCardMin')
            .max(25, 'card.number.cityCardMax'),
      })
      .when('type', {
        is: null,
        then: (schema) => schema.matches(/^\d{3}$/gi, 'card.number.cardMin'),
      }),
    expiration_date: Yup.string().when('type', {
      is: 'emv_card',
      then: (schema) =>
        schema
          .required('card.expiration_date.required')
          .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'card.expiration_date.match'),
    }),
  },
  wallet: {
    value: Yup.number().required('required').min(1).positive('wallet.positive'),
  },
  email: Yup.string().email('email.invalid').required('required'),
  email_confirmation: Yup.string()
    .required('required')
    .oneOf([Yup.ref('email')], 'email.notMatch'),
  password: Yup.string()
    .required('required')
    .min(8, 'password.min')
    .minLowercase(1, 'password.minLowercase')
    .minUppercase(1, 'password.minUppercase')
    .minSymbols(1, 'password.minSymbols'),
  password_confirmation: Yup.string()
    .required('required')
    .oneOf([Yup.ref('password')], 'password.notMatch'),
  date: Yup.string().required('required'),
  telephone: Yup.string()
    .required('required')
    .matches(/^\d{9}$/gi, 'phone.notMatch'),
  yesOrNo: Yup.string().oneOf(['TAK', 'NIE'], 'required'),
  pesel: Yup.string().when('havePesel', {
    is: 'TAK',
    then: (schema) =>
      schema
        .required('required')
        .matches(/^\d{11}$/, 'pesel.invalid')
        .test('isValidPesel', 'pesel.invalid', (value) => {
          if (!value) return false;
          const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3, 1];
          let sum = 0;
          for (let i = 0; i < weights.length; i++) {
            sum += weights[i] * parseInt(value[i]);
          }
          return sum % 10 === 0;
        }),
  }),
  terms: Yup.string().oneOf(['1'], 'terms.required'),
  order: {
    ticket: Yup.array()
      .of(
        Yup.object({
          id: Yup.string().required(),
          name: Yup.string().required(),
          price: Yup.number().required(),
          activation_date: Yup.string().required(),
          validity: Yup.number().required(),
        })
      )
      .min(1, 'order.ticket'),
    payment: {
      payment_method: Yup.string().oneOf(['card', 'cash']).required(),
      document_type: Yup.string()
        .oneOf([...documentTypeOptions.map(({ value }) => value)])
        .required(),
      company_name: Yup.string().when('document_type', {
        is: 'invoice',
        then: (schema) => schema.required('required'),
      }),
      company_nip: Yup.string().when('document_type', {
        is: 'invoice',
        then: (schema) =>
          schema.required('required').matches(/^[0-9]{10}$/gi, 'company.nip'),
      }),
      address_zip: Yup.string().when('document_type', {
        is: 'invoice',
        then: (schema) =>
          schema
            .required('required')
            .matches(/^[0-9]{2}-[0-9]{3}$/, 'address.zip.format'),
      }),
      address_city: Yup.string().when('document_type', {
        is: 'invoice',
        then: (schema) =>
          schema
            .required('required')
            .min(3, 'address.city.min')
            .max(30, 'address.city.max'),
      }),
      address_street: Yup.string().when('document_type', {
        is: 'invoice',
        then: (schema) =>
          schema
            .required('required')
            .min(3, 'address.street.min')
            .max(30, 'address.street.max'),
      }),
      address_number: Yup.string().when('document_type', {
        is: 'invoice',
        then: (schema) =>
          schema.required('required').max(5, 'address.number.max'),
      }),
    },
  },
  pokCase: {
    required: Yup.string().nullable().required('required'),
  },
  role: Yup.array().required('required'),
};
