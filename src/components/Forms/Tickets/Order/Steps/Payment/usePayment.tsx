import { FormikContextType, FormikValues, useFormikContext } from 'formik';
import useTranslation from 'next-translate/useTranslation';

export const usePayment = () => {
  const { values }: FormikContextType<FormikValues> = useFormikContext();
  const { t } = useTranslation('form');

  return { values, t };
};
