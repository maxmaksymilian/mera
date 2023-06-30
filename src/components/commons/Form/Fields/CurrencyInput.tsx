import { useFormikContext } from 'formik';
import Root, {
  CurrencyInputProps as InputProps,
} from 'react-currency-input-field';

import { clsxm } from '@/lib';

import { FormField, useFormField } from '@/components/commons/Form/FormField';

export type CurrencyInputProps = InputProps & {
  name: string;
};

export const CurrencyInput = ({ className, ...props }: CurrencyInputProps) => {
  const form = useFormikContext();
  const { formFieldProps } = useFormField(props);

  return (
    <FormField {...formFieldProps}>
      <Root
        decimalsLimit={2}
        defaultValue={0}
        groupSeparator={' '}
        suffix='PLN'
        onValueChange={(value, name) =>
          form.setFieldValue(name ? name : '', value)
        }
        className={clsxm(
          'focus:border-1 w-full rounded-xs border border-cloud text-gray outline-0 focus:border-cloud',
          className
        )}
        {...props}
      />
    </FormField>
  );
};
