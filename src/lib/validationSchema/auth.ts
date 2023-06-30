import * as Yup from 'yup';
import YupPassword from 'yup-password';

YupPassword(Yup);

const errorsMessages = {
  email: {
    invalid: 'password.invalid',
    notMatch: 'password.notMatch',
  },
  password: {
    required: 'password.required',
    min: 'password.min',
    minLowercase: 'password.minLowercase',
    minUppercase: 'password.minUppercase',
    minSymbols: 'password.minSymbols',
    notMatch: 'password.notMatch',
  },
  phone: {
    notMatch: 'phone.notMatch',
  },
  pesel: {
    valid: 'pesel.valid',
    isPesel: 'pesel.isPesel',
    test: 'pesel.test',
  },
  commons: {
    required: 'required',
  },
  terms: {
    required: 'terms.required',
  },
};

const { email, phone, password, pesel, commons, terms } = errorsMessages;

export const newPasswordFormValidation = Yup.object().shape({
  password: Yup.string()
    .required(commons.required)
    .min(8, password.min)
    .minLowercase(1, password.minLowercase)
    .minUppercase(1, password.minUppercase)
    .minSymbols(1, password.minSymbols),
  passwordConfirmation: Yup.string()
    .required(commons.required)
    .oneOf([Yup.ref('password')], password.notMatch),
});

export const changePasswordFormValidation = Yup.object().shape({
  current_password: Yup.string().required(commons.required),
  password: Yup.string()
    .required(commons.required)
    .min(8, password.min)
    .minLowercase(1, password.minLowercase)
    .minUppercase(1, password.minUppercase)
    .minSymbols(1, password.minSymbols),
  password_confirmation: Yup.string()
    .required(commons.required)
    .oneOf([Yup.ref('password')], password.notMatch),
});

export const resetPasswordFormValidation = Yup.object().shape({
  email: Yup.string().email(email.invalid).required(commons.required),
});

export const transfomFormValidation = Yup.object().shape({
  email: Yup.string().email(email.invalid).required(commons.required),
  password: Yup.string()
    .required(commons.required)
    .min(8, password.min)
    .minLowercase(1, password.minLowercase)
    .minUppercase(1, password.minUppercase)
    .minSymbols(1, password.minSymbols),
  passwordConfirmation: Yup.string()
    .required(commons.required)
    .oneOf([Yup.ref('password')], password.notMatch),
});

export const registerValidation = Yup.object().shape({
  email: Yup.string().email(email.invalid).required(commons.required),
  emailConfirmation: Yup.string()
    .required(commons.required)
    .oneOf([Yup.ref('email')], email.notMatch),
  password: Yup.string()
    .required(commons.required)
    .min(8, password.min)
    .minLowercase(1, password.minLowercase)
    .minUppercase(1, password.minUppercase)
    .minSymbols(1, password.minSymbols),
  passwordConfirmation: Yup.string()
    .required(commons.required)
    .oneOf([Yup.ref('password')], password.notMatch),
  birth: Yup.string().required(commons.required),
  phoneNumber: Yup.string()
    .required(commons.required)
    .matches(/^\d{9}$/gi, phone.notMatch),
  name: Yup.string().required(commons.required),
  surname: Yup.string().required(commons.required),
  havePesel: Yup.string().required(pesel.isPesel),
  pesel: Yup.string().when('havePesel', {
    is: 'TAK',
    then: (schema) =>
      schema
        .required(commons.required)
        .matches(/^\d{11}$/, pesel.valid)
        .test('isValidPesel', pesel.test, (value) => {
          if (!value) return false;
          const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3, 1];
          let sum = 0;
          for (let i = 0; i < weights.length; i++) {
            sum += weights[i] * parseInt(value[i]);
          }
          return sum % 10 === 0;
        }),
  }),
  customAgreement1: Yup.boolean().oneOf([true], commons.required),
  customAgreement2: Yup.boolean().oneOf([true], commons.required),
  termsAgreement: Yup.boolean().oneOf([true], terms.required),
});
