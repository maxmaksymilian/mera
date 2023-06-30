import { FormikValues } from 'formik';

import { UseApiMutationProps } from '@/hooks/api/useApiMutation';

export type FormProps = {
  handleSubmit: ({ data, values }?: any) => void;
  handleClose?: () => void;
  oldValues?: FormikValues;
  buttonLabel?: string;
  access?: 'admin' | 'client';
} & UseApiMutationProps;
