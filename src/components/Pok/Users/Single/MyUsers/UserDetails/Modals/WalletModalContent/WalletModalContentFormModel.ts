import { validationSchema } from '@/lib/validation';

export const initialValues = {
  value: '0',
};

export const walletFormValidation = validationSchema.global.required;
