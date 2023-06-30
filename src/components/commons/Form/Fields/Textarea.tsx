import { useFormikContext } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import { ComponentProps } from 'react';

import { clsxm } from '@/lib';

import { FormField, useFormField } from '@/components/commons/Form/FormField';

export type TextareaProps = {
  name: string;
  label?: string;
  className?: string;
} & ComponentProps<'textarea'>;

export const Textarea = ({ className, ...props }: TextareaProps) => {
  const { t } = useTranslation('form');
  const { placeholder } = props;
  const { formFieldProps, childProps } = useFormField(props);
  const form = useFormikContext();
  const { value, error } = form.getFieldMeta<
    string | number | readonly string[] | undefined
  >(props.name);

  return (
    <FormField {...formFieldProps}>
      <textarea
        {...{
          ...childProps,
          rows: 8,
          value,
          placeholder: placeholder ? t(`label.${placeholder}`) : '',
          onChange: form.handleChange,
          className: clsxm(
            'focus:border-1 resize-none rounded-xs border outline-0 focus:border-navy',
            error
              ? 'border-error focus:border-error'
              : 'border-cloud focus:border-cloud',
            className
          ),
        }}
      />
    </FormField>
  );
};
