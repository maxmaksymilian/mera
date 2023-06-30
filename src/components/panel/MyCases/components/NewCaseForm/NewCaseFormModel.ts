import * as Yup from 'yup';

import { validationSchema, ValidationSchemaType } from '@/lib/validation';

export const newCaseValidationSchema = Yup.object({
  type: validationSchema.global.required,
  title: validationSchema.case.title,
  description: validationSchema.case.description,
});

export const customerServiceNewCaseValidationSchema = Yup.object().shape({
  ...newCaseValidationSchema.fields,
  client: validationSchema.pokCase.required,
  guardian: validationSchema.pokCase.required,
});

type InitialValuesType = {
  file: File[];
};

export const initialValues: InitialValuesType &
  ValidationSchemaType<typeof newCaseValidationSchema> = {
  type: '',
  title: '',
  description: '',
  file: [],
};

export const customerServiceInitialValues = {
  ...initialValues,
  client: '',
  guardian: '',
};
