import { useFormikContext } from 'formik';
import { useState } from 'react';

import { clsxm } from '@/lib';
import { Without } from '@/lib/api';
import { convertDate } from '@/lib/helpers';

import { FormField, useFormField } from '@/components/commons/Form/FormField';
import { DatePickerInputProps as RootProps } from '@/components/commons/Form/Ui/DatepickerInput';
import Root from '@/components/commons/Form/Ui/DatepickerInput';

type RangeDatepickerProps = {
  fromName: string;
  toName: string;
  fromLabel?: string;
  toLabel?: string;
  fromPlaceholder?: string;
  toPlaceholder?: string;
  className?: string;
} & Without<RootProps, 'clearValue' | 'handleChange' | 'placeholder'>;

export const RangeDatepicker = ({
  className,
  fromName,
  toName,
  fromLabel,
  toLabel,
  fromPlaceholder,
  toPlaceholder,
  showTimeInput = false,
  ...props
}: RangeDatepickerProps) => {
  const { formFieldProps: fromFormField } = useFormField({
    ...props,
    name: fromName,
  });
  const { formFieldProps: toFormField } = useFormField({
    ...props,
    name: toName,
  });
  const { getFieldMeta, setFieldValue } = useFormikContext();
  const { value: fromValue, error: fromError } = getFieldMeta<string>(fromName);
  const { value: toValue, error: toError } = getFieldMeta<string>(toName);

  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();

  const handleFromChange = (
    dates: Date | [Date | null, Date | null] | null
  ) => {
    if (!dates) return;

    if (dates instanceof Date) {
      setDateFrom(dates);
      setFieldValue(fromName, convertDate(dates || '', showTimeInput), false);
      if (!dateTo || dates >= dateTo || toValue === '') {
        const date = new Date(dates);
        date.setDate(date.getDate() + 1);
        setDateTo(date);
        setFieldValue(toName, convertDate(date || '', showTimeInput), false);
      }
    }
  };

  const handleToChange = (dates: Date | [Date | null, Date | null] | null) => {
    if (!dates) return;

    if (dates instanceof Date) {
      setDateTo(dates);
      setFieldValue(toName, convertDate(dates || ''), false);
      if (!dateFrom || dates <= dateFrom || fromValue === '') {
        const date = new Date(dates);
        date.setDate(date.getDate() - 1);
        setDateFrom(date);
        setFieldValue(fromName, convertDate(date || ''), false);
      }
    }
  };

  const clearValue = () => {
    setFieldValue(fromName, '', false);
    setFieldValue(toName, '', false);
  };

  return (
    <div
      {...{
        className: clsxm('flex flex-col gap-5 md:flex-row md:gap-2', className),
      }}
    >
      <FormField {...fromFormField}>
        <Root
          {...{
            ...props,
            clearValue,
            handleChange: handleFromChange,
            label: fromLabel,
            name: fromName,
            value: fromValue,
            error: fromError,
            placeholder: fromPlaceholder,
          }}
        />
      </FormField>
      <FormField {...toFormField}>
        <Root
          {...{
            ...props,
            clearValue,
            handleChange: handleToChange,
            label: toLabel,
            name: toName,
            value: toValue,
            error: toError,
            placeholder: toPlaceholder,
          }}
        />
      </FormField>
    </div>
  );
};
