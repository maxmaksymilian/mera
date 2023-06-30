import * as Yup from 'yup';

export const addNewCaseValidation = Yup.object({
  type: Yup.string().required('Wybierz rodzaj sprawy'),
  title: Yup.string()
    .min(4, 'Minimum 4 znaki')
    .max(255, 'Maksymalnie 255 znaków')
    .required('Wpisz tytuł sprawy'),
  description: Yup.string()
    .min(10, 'Minimum 10 znaków')
    .max(1000, 'Maximum maksymalnie 1000 znaków')
    .required('Opisz swoją sprawę'),
});

export const addMessageFormValidation = Yup.object({
  message: Yup.string()
    .min(10, 'Minimum 10 znaków')
    .max(1000, 'Maksymalnie 1000 znaków')
    .required('To pole jest wymagane'),
});

export const editCaseValidation = Yup.object({
  type: Yup.string()
    .oneOf(['complaint', 'refund'])
    .nullable()
    .required('required'),
  guardian: Yup.string().nullable().required('required'),
});
