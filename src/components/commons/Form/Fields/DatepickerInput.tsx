import { useFormikContext } from 'formik';
import React from 'react';

import 'react-datepicker/dist/react-datepicker.css';

import { Without } from '@/lib/api';
import { convertDate } from '@/lib/helpers';

import { FormField, useFormField } from '@/components/commons/Form/FormField';
import Root, {
  DatePickerInputProps as RootProps,
} from '@/components/commons/Form/Ui/DatepickerInput';

export type DatePickerInputProps = {
  name: string;
  label?: string;
} & Without<RootProps, 'clearValue' | 'handleChange'>;

export const DatePickerInput = ({ ...props }: DatePickerInputProps) => {
  const { name, showTimeInput = false } = props;
  const { formFieldProps } = useFormField({ ...props });
  const { getFieldMeta, setFieldValue } = useFormikContext();
  const { value, error } = getFieldMeta<string>(name);

  const handleChange = (dates: Date | [Date | null, Date | null] | null) => {
    if (!dates) return;

    if (dates instanceof Date) {
      setFieldValue(name, convertDate(dates || '', showTimeInput), false);
    }
  };

  return (
    <FormField {...formFieldProps}>
      <Root
        {...{
          ...props,
          value,
          error,
          handleChange,
          clearValue: () => setFieldValue(name, '', false),
        }}
      />
    </FormField>
  );
};
