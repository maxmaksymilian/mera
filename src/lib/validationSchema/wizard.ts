import * as Yup from 'yup';

const cardTypes = ['city_card', 'emv_card', 'student_card'];

export const errorMessages = {
  requiredCardType: 'Wybierz rodzaj nośnika',
  requiredCardName: 'Wpisz nazwę karty',
  cardMinChars: 'Nazwa karty powinna zawierać conajmniej 5 znaków',
  cardMaxChars: 'Nazwa karty powinna zawierać maksymalnie 35 znaków',
  requiredCardNumber: 'Wpisz numer karty',
  cardNumberMatch: 'Numer powinien składać się z 6 cyfr',
  cardNumberLength10: 'Numer powinien składać się z 10 cyfr',
  requiredExpirationDate: 'Podaj datę ważności',
  expirationDateMatch: 'Wymagany format: mm/RR',
  requiredZip: 'Wpisz kod pocztowy',
  zipMatch: 'Dozwolony format: XX-XXX',
  requiredCity: 'Wpisz miasto',
  cityMinChars: 'Nazwa miasta powinna składać się przynajmniej z 3 znaków',
  cityMaxChars: 'Nazwa miasta powinna składać się z maksymlanie 30 znaków',
  requiredStreet: 'Wpisz nazwę ulicy',
  streetMinChars: 'Minimum 3 znaki',
  streetMaxChars: 'Maksimum 30 znaków',
  requiredStreetNumber: 'Wpisz numer ulicy',
  streetNumberMaxChars: 'Maksimum 5 znaków',
  aptNumberMatch: 'Dozwolone są tylko cyfry',
  requiredDiscount: 'Wybierz rodzaj zniżki',
  documentPhotoRequired: 'Pole wymagane',
  invalidFormat: 'Dozwolone są tylko pliki typu JPG, PNG i PDF.',
  required: 'Pole wymagane',
  max60Length: 'Maksymalnie 60 znaków',
  nipMatch: 'Numer powinien składać się z 10 cyfr',
};

const {
  requiredCardType,
  requiredCardName,
  cardMinChars,
  cardMaxChars,
  requiredCardNumber,
  cardNumberMatch,
  cardNumberLength10,
  requiredExpirationDate,
  expirationDateMatch,
  requiredZip,
  zipMatch,
  requiredCity,
  cityMinChars,
  cityMaxChars,
  requiredStreet,
  streetMinChars,
  streetMaxChars,
  requiredStreetNumber,
  streetNumberMaxChars,
  aptNumberMatch,
  requiredDiscount,
  documentPhotoRequired,
  invalidFormat,
  required,
  max60Length,
  nipMatch,
} = errorMessages;

export const cardDataValidation = Yup.object().shape({
  card_type: Yup.string().oneOf(cardTypes).required(requiredCardType),
  card_name: Yup.string()
    .required(requiredCardName)
    .min(5, cardMinChars)
    .max(35, cardMaxChars),
  card_number: Yup.string()
    .required(requiredCardNumber)
    .when('card_type', {
      is: 'emv_card',
      then: (schema) => schema.matches(/^\d{10}$/gi, cardNumberLength10),
    })
    .when('card_type', {
      is: 'student_card',
      then: (schema) => schema.matches(/^\d{6}$/gi, cardNumberMatch),
    }),
  card_expiration_date: Yup.string()
    .when('card_type', {
      is: 'student_card',
      then: (schema) =>
        schema
          .required(requiredExpirationDate)
          .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, expirationDateMatch),
    })
    .when('card_type', {
      is: 'emv_card',
      then: (schema) =>
        schema
          .required(requiredExpirationDate)
          .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, expirationDateMatch),
    }),
});

export const addressValidation = Yup.object().shape({
  address_zip: Yup.string()
    .required(requiredZip)
    .matches(/^[0-9]{2}-[0-9]{3}$/, zipMatch),
  address_city: Yup.string()
    .required(requiredCity)
    .min(3, cityMinChars)
    .max(30, cityMaxChars),
  address_street: Yup.string()
    .required(requiredStreet)
    .min(3, streetMinChars)
    .max(30, streetMaxChars),
  address_number: Yup.string()
    .required(requiredStreetNumber)
    .max(5, streetNumberMaxChars),
  address_apt_number: Yup.string().matches(/\d{1,5}/gi, aptNumberMatch),
  registered_address_zip: Yup.string().when('registered_address', {
    is: false,
    then: (schema) =>
      schema.required(requiredZip).matches(/^[0-9]{2}-[0-9]{3}$/, zipMatch),
  }),
  registered_address_city: Yup.string().when('registered_address', {
    is: false,
    then: (schema) =>
      schema.required(requiredCity).min(3, cityMinChars).max(30, cityMaxChars),
  }),
  registered_address_street: Yup.string().when('registered_address', {
    is: false,
    then: (schema) =>
      schema
        .required(requiredStreet)
        .min(3, streetMinChars)
        .max(30, streetMaxChars),
  }),
  registered_address_number: Yup.string().when('registered_address', {
    is: false,
    then: (schema) =>
      schema.required(requiredStreetNumber).max(5, streetNumberMaxChars),
  }),
  registered_address_apt_number: Yup.string().when('registered_address', {
    is: false,
    then: (schema) => schema.matches(/\d{1,5}/gi, aptNumberMatch),
  }),
  company_name: Yup.string().when('company', {
    is: true,
    then: (schema) => schema.required(required).max(30, max60Length),
  }),
  company_nip: Yup.string().when('company', {
    is: true,
    then: (schema) =>
      schema.required(required).matches(/^[0-9]{10}$/gi, nipMatch),
  }),
  company_address_zip: Yup.string().when('company', {
    is: true,
    then: (schema) =>
      schema.required(requiredZip).matches(/^[0-9]{2}-[0-9]{3}$/, zipMatch),
  }),
  company_address_city: Yup.string().when('company', {
    is: true,
    then: (schema) =>
      schema.required(requiredCity).min(3, cityMinChars).max(30, cityMaxChars),
  }),
  company_address_street: Yup.string().when('company', {
    is: true,
    then: (schema) =>
      schema
        .required(requiredStreet)
        .min(3, streetMinChars)
        .max(30, streetMaxChars),
  }),
  company_address_number: Yup.string().when('company', {
    is: true,
    then: (schema) =>
      schema.required(requiredStreetNumber).max(5, streetNumberMaxChars),
  }),
});

export const discountsValidation = Yup.object().shape({
  is_discount: Yup.boolean(),
  document_discount: Yup.string().when('is_discount', {
    is: true,
    then: Yup.string().required(requiredDiscount),
  }),
  document_front: Yup.mixed().when('is_discount', {
    is: true,
    then: Yup.mixed()
      .required(documentPhotoRequired)
      .test('fileFormat', invalidFormat, (value) => {
        if (!value) return true;
        return ['image/jpeg', 'image/png', 'application/pdf'].includes(
          value.type
        );
      }),
  }),
  document_back: Yup.mixed().when('is_discount', {
    is: true,
    then: Yup.mixed()
      .required(documentPhotoRequired)
      .test('fileFormat', invalidFormat, (value) => {
        if (!value) return true;
        return ['image/jpeg', 'image/png', 'application/pdf'].includes(
          value.type
        );
      }),
  }),
});

export const wizardValidation = Yup.object().shape({
  ...cardDataValidation.fields,
  ...addressValidation.fields,
  ...discountsValidation.fields,
});

export const wizardStepsValidation = [
  null,
  cardDataValidation,
  addressValidation,
  discountsValidation,
  null,
];
