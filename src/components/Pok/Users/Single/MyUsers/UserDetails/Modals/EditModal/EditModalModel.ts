import * as Yup from 'yup';

import { validationSchema, ValidationSchemaType } from '@/lib/validation';

export const myUsersEditValidationSchema = Yup.object({
  first_name: validationSchema.global.required,
  last_name: validationSchema.global.required,
  pesel: validationSchema.pesel,
  email: validationSchema.global.email,
  telephone: validationSchema.global.telephone,
  telephone_prefix: validationSchema.global.required,
});

export type EditModalType = {
  handleClose: () => void;
  handleReload: () => void;
  values: ValidationSchemaType<typeof myUsersEditValidationSchema>;
  id: string;
  userid: string;
};
