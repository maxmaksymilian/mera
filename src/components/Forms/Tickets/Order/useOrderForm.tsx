import { useState } from 'react';

import { updateTime } from '@/lib/helpers';
import { useApiMutation } from '@/hooks/api/useApiMutation';

import { useForm } from '@/components/commons/Form/useForm';

import { OrderFormProps } from './OrderForm';
import {
  initialValues,
  ItemType,
  orderValidationSchema as validationSchema,
} from './OrderFormModel';
import { Configurator } from './Steps/Configurator/Configurator';
import { Payment } from './Steps/Payment/Payment';
import { Tickets } from './Steps/Tickets/Tickets';

export const useOrderForm = ({
  cardId,
  handleSubmit,
  ticketsQuery,
  access,
  ...props
}: OrderFormProps) => {
  const [step, setStep] = useState<number>(0);
  const { mutate, isLoading, errors } = useApiMutation({
    ...props,
    method: 'POST',
  });

  const form = useForm({
    validationSchema: validationSchema[step],
    initialValues: { ...initialValues, card: cardId || '' },
    onSubmit: (values) => {
      if (step === 0 || (access === 'admin' && step === 1)) {
        setStep((prev) => prev + 1);
      } else {
        mutate(
          {
            ...values,
            item: values.item.map((item: ItemType) => ({
              ...item,
              activation_date: updateTime(item.activation_date),
            })),
          },
          {
            onSuccess: ({ error, data }) =>
              error ? null : handleSubmit({ data, values }),
          }
        );
      }
    },
  });

  const stepComponents = [
    <Tickets key='tickets' {...{ ...ticketsQuery, access }} />,
    <Configurator key='configurator' />,
    <Payment key='payment' />,
  ];

  return { step, setStep, stepComponents, form, isLoading, errors };
};
