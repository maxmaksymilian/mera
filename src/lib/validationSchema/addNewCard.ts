import * as Yup from 'yup';

const cardTypes = ['city_card', 'emv_card', 'student_card'];

export const addCardValidation = Yup.object().shape({
  user: Yup.string(),
  type: Yup.string().oneOf(cardTypes).required(`Wybierz rodzaj nośnika`),
  name: Yup.string()
    .required('Wpisz nazwę karty')
    .min(5, 'Nazwa karty powinna zawierać conajmniej 5 znaków')
    .max(35, 'Nazwa karty powinna zawierać maksymalnie 35 znaków'),
  number: Yup.string()
    .required('Wpisz numer karty')
    .when('type', {
      is: 'emv_card',
      then: (schema) =>
        schema.matches(/^\d{10}$/gi, 'Numer powinien składać się z 10 cyfr'),
    })
    .when('type', {
      is: 'student_card',
      then: (schema) =>
        schema.matches(/^\d{6}$/gi, 'Numer powinien składać się z 6 cyfr'),
    })
    .when('type', {
      is: 'city_card',
      then: (schema) =>
        schema
          .required('Pole wymagane')
          .min(3, 'Minimum 3 cyfry')
          .max(25, 'Mkasymalnie 25 cyfr'),
    })
    .when('type', {
      is: null,
      then: (schema) =>
        schema.matches(/^\d{3}$/gi, 'Numer powinien składać się z 3 cyfr'),
    }),
  expiration_date: Yup.string()
    .when('type', {
      is: 'emv_card',
      then: (schema) =>
        schema.matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Wymagany format: mm/RR'),
    })
    .when('type', {
      is: 'student_card',
      then: (schema) =>
        schema.matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Wymagany format: mm/RR'),
    }),
});
