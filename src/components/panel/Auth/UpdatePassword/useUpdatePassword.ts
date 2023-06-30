import { FormikValues } from 'formik';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { UpdatePasswordFormType } from './UpdatePassword';

type CodeDataType = {
  token: string;
  email: string;
  password: string;
  password_confirmation: string;
  isCode: boolean;
};

export const useUpdatePassword = (props: UpdatePasswordFormType) => {
  const router = useRouter();
  const [data, setData] = useState<CodeDataType>({
    ...props,
    password: '',
    password_confirmation: '',
    isCode: false,
  });

  const setCodeData = (values: FormikValues) =>
    setData((prev) => ({
      ...prev,
      password: values.password,
      password_confirmation: values.password_confirmation,
      isCode: true,
    }));

  return {
    setCodeData,
    router,
    ...data,
  };
};
