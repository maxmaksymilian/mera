import * as Yup from 'yup';

const cardTypes = ['city_card', 'emv_card', 'student_card'];

export const stepTwoValidation = Yup.object({
  first_name: Yup.string().required('validation.required'),
  last_name: Yup.string().required('validation.required'),
  is_pesel: Yup.string().required('validation.isPesel'),
  pesel: Yup.string().when('is_pesel', {
    is: '1',
    then: (schema) =>
      schema
        .required('validation.required')
        .matches(/^\d{11}$/, 'validation.pesel.valid')
        .test('isValidPesel', 'validation.pesel.test', (value) => {
          if (!value) return false;
          const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3, 1];
          let sum = 0;
          for (let i = 0; i < weights.length; i++) {
            sum += weights[i] * parseInt(value[i]);
          }
          return sum % 10 === 0;
        }),
  }),
  birthday_date: Yup.string().required('validation.required'),
  email: Yup.string().email('validation.email.valid'),
  telephone: Yup.string().matches(/^\d{9}$/gi, 'validation.phone.notMatch'),
});

export const stepThreeValidation = Yup.object({
  card_id: Yup.string().when('card', {
    is: '0',
    then: (schema) => schema.required('Wybierz kartę'),
  }),
  card_name: Yup.string().when('card', {
    is: '1',
    then: (schema) =>
      schema
        .required('validation.required')
        .min(5, 'Nazwa karty powinna zawierać conajmniej 5 znaków')
        .max(35, 'Nazwa karty powinna zawierać maksymalnie 35 znaków'),
  }),
  card_type: Yup.string().when('card', {
    is: '1',
    then: (schema) =>
      schema.oneOf(cardTypes).required(`Wybierz rodzaj nośnika`),
  }),
  card_number: Yup.string().when('card', {
    is: '1',
    then: (schema) =>
      schema
        .required('Wpisz numer karty')
        .when('card_type', {
          is: 'emv_card',
          then: (schema) =>
            schema.matches(
              /^\d{10}$/gi,
              'Numer powinien składać się z 10 cyfr'
            ),
        })
        .when('card_type', {
          is: 'student_card',
          then: (schema) =>
            schema.matches(/^\d{6}$/gi, 'Numer powinien składać się z 6 cyfr'),
        }),
  }),
  card_expiration_date: Yup.string()
    .when('card_type', {
      is: 'emv_card',
      then: (schema) =>
        schema
          .required('Podaj datę ważności')
          .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Wymagany format: mm/RR'),
    })
    .when('card_type', {
      is: 'student_card',
      then: (schema) =>
        schema
          .required('Podaj datę ważności')
          .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Wymagany format: mm/RR'),
    }),
});
