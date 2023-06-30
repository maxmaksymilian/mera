import * as Yup from 'yup';

const cardTypes = ['emv_card', 'student_card'];

export const changeGeneralDataValidation = Yup.object().shape({
  first_name: Yup.string().required('required').min(2, 'user.firstName'),
  last_name: Yup.string().required('required').min(2, 'user.lastName'),
  pesel: Yup.string().min(11, 'pesel.valid').max(11, 'pesel.valid'),
  email: Yup.string().required('required').email('email.invalid'),
  telephone: Yup.string()
    .required('required')
    .min(9, 'telephone.min')
    .max(10, 'telephone.max'),
  telephone_prefix: Yup.string(),
});

export const changeAddressDataValidation = Yup.object().shape({
  street: Yup.string()
    .required('required')
    .min(3, 'address.street.min')
    .max(30, 'address.street.min'),
  number: Yup.string()
    .required('required')
    .min(1, 'address.number.min')
    .max(5, 'address.number.max'),
  apt_number: Yup.string().matches(
    /\d{1,5}/gi,
    'address.apt_number.onlyNumbers'
  ),
  zip: Yup.string()
    .required('required')
    .matches(/^[0-9]{2}-[0-9]{3}$/, 'address.zip.format'),
  city: Yup.string()
    .required('required')
    .min(3, 'address.city.min')
    .max(20, 'address.city.max'),
});

export const changeDocumentFormValidation = Yup.object().shape({
  type: Yup.string().oneOf(cardTypes),
  number: Yup.string().matches(/\d{6}/gi, 'card.number.studentCardMatch'),
  expiration_date: Yup.string().matches(
    /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/,
    'card.expiration_date.match'
  ),
  verified_at: Yup.string(),
});

export const changeDiscountFormValidation = Yup.object().shape({});
