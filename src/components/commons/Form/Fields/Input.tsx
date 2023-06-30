import { useFormikContext } from 'formik';

import { FormField, useFormField } from '@/components/commons/Form/FormField';
import Root, {
  InputProps as RootProps,
} from '@/components/commons/Form/Ui/Input';

type InputProps = {
  name: string;
  label?: string;
  className?: string;
} & Omit<RootProps, 'name'>;

export const Input = ({ className, ...props }: InputProps) => {
  const { formFieldProps, childProps } = useFormField(props);
  const form = useFormikContext();
  const { value, error } = form.getFieldMeta<
    string | number | readonly string[] | undefined
  >(props.name);

  return (
    <FormField {...formFieldProps}>
      <Root
        {...{
          ...childProps,
          value,
          error,
          className,
          onChange: form.handleChange,
          onBlur: form.handleBlur,
        }}
      />
    </FormField>
  );
};
