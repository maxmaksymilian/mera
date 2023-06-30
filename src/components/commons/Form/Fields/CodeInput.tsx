import { useFormikContext } from 'formik';
import ReactCodeInput, { ReactCodeInputProps } from 'react-code-input';

import { FormField, useFormField } from '@/components/commons/Form/FormField';

type CodeInputProps = {
  name: string;
  label?: string;
} & Omit<ReactCodeInputProps, 'name' | 'inputMode'>;

export const CodeInput = ({ ...props }: CodeInputProps) => {
  const { formFieldProps, childProps } = useFormField(props);
  const form = useFormikContext();
  const { value, error } = form.getFieldMeta<string>(props.name);

  return (
    <FormField {...formFieldProps}>
      <ReactCodeInput
        {...{
          ...childProps,
          type: 'text',
          value,
          isValid: error === undefined,
          className: 'code-input',
          onChange: (e) => form.setFieldValue(props.name, e),
          inputMode: 'full-width-latin',
        }}
      />
    </FormField>
  );
};
