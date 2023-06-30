import * as Yup from 'yup';

import { validationSchema, ValidationSchemaType } from '@/lib/validation';

export const myUsersEditValidationSchema = Yup.object({
  first_name: validationSchema.global.required,
  last_name: validationSchema.global.required,
  pesel: validationSchema.pesel,
  email: validationSchema.email,
  telephone: validationSchema.telephone,
  telephone_prefix: validationSchema.global.required,
});

export type EditModalType = {
  handleClose: () => void;
  handleRefresh: () => void;
  values: ValidationSchemaType<typeof myUsersEditValidationSchema>;
  id: string;
};
