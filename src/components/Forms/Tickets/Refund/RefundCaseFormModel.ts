import * as Yup from 'yup';

import { validationSchema, ValidationSchemaType } from '@/lib/validation';

export const refundCaseValidationSchema = Yup.object({
  ticket: validationSchema.global.required,
  type: validationSchema.global.required,
  title: validationSchema.case.title,
  description: validationSchema.case.description,
});

type InitialValuesType = {
  file: File[];
};

export const initialValues: InitialValuesType &
  ValidationSchemaType<typeof refundCaseValidationSchema> = {
  ticket: '',
  type: '',
  title: '',
  description: '',
  file: [],
};
