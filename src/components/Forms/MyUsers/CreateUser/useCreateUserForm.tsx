import { useState } from 'react';

import { filterObject } from '@/lib/helpers';
import { useApiMutation } from '@/hooks/api/useApiMutation';

import { useForm } from '@/components/commons/Form/useForm';

import { CreateUserFormProps } from './CreateUserForm';
import {
  createUserValidationSchema as validationSchema,
  initialValues,
} from './CreateUserFormModel';
import { CardData } from './Steps/CardData';
import { Summary } from './Steps/Summary';
import { UserData } from './Steps/UserData';

export const useCreateUserForm = ({
  handleSubmit,
  ...props
}: CreateUserFormProps) => {
  const [step, setStep] = useState<number>(0);
  const { mutate, isLoading, errors } = useApiMutation(props);

  const form = useForm({
    initialValues,
    validationSchema: validationSchema[step],
    onSubmit: async (values) => {
      if (step === 0) {
        return setStep((prev) => prev + 1);
      }

      mutate(values.card === '1' ? values : filterObject(values, 'card'), {
        onSuccess: ({ error }) => {
          if (!error) {
            handleSubmit();
            setStep((prev) => prev + 1);
          }
        },
      });
    },
  });

  const stepComponent = [
    <UserData key='user-data' />,
    <CardData key='card-data' {...{ params: errors }} />,
    <Summary key='summary' />,
  ];

  return { form, isLoading, step, setStep, stepComponent };
};
