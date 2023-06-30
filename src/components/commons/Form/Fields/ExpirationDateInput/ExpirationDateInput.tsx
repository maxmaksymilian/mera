import { useFormikContext } from 'formik';
import { ComponentProps } from 'react';

import { clsxm } from '@/lib';

import { FormField, useFormField } from '@/components/commons/Form/FormField';

import { useExpirationDateInput } from './useExpirationDateInput';

export type ExpirationDateInputProps = {
  name: string;
  label?: string;
  className?: string;
} & ComponentProps<'input'>;

export const ExpirationDateInput = ({
  className,
  ...props
}: ExpirationDateInputProps) => {
  const { name, placeholder } = props;
  const form = useFormikContext();
  const { formFieldProps, childProps } = useFormField(props);
  const { value, error } = form.getFieldMeta<
    string | number | readonly string[] | undefined
  >(props.name);
  const { t, handleExpirationDateChange } = useExpirationDateInput({
    name,
    setFieldValue: form.setFieldValue,
  });

  return (
    <FormField {...formFieldProps}>
      <input
        {...{
          ...childProps,
          value,
          placeholder: placeholder ? t(`label.${placeholder}`) : '',
        }}
        type='text'
        maxLength={5}
        onChange={handleExpirationDateChange}
        className={clsxm(
          'focus:border-1 h-12 w-auto rounded-xs border px-6 outline-0 focus:border-navy',
          error
            ? 'border-error focus:border-error'
            : 'border-cloud focus:border-cloud',
          className
        )}
      />
    </FormField>
  );
};
