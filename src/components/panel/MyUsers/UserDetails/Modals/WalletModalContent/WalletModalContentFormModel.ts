import * as Yup from 'yup';

import { validationSchema } from '@/lib/validation';

export const initialValues = {
  value: '0',
};

export const walletFormValidation = Yup.object({
  value: validationSchema.wallet.value,
});
