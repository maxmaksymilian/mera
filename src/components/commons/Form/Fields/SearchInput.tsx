import { useFormikContext } from 'formik';

import { Without } from '@/lib/api';

import { FormField, useFormField } from '@/components/commons/Form/FormField';
import Root, {
  SearchInputProps as RootProps,
} from '@/components/commons/Form/Ui/SearchInput';

export type SearchInputProps = {
  name: string;
  label?: string;
} & Without<RootProps, 'clearField'>;

export const SearchInput = ({ ...props }: SearchInputProps) => {
  const { name } = props;
  const { formFieldProps, childProps } = useFormField(props);
  const form = useFormikContext();
  const { value } = form.getFieldMeta<
    string | number | readonly string[] | undefined
  >(props.name);

  return (
    <FormField {...formFieldProps}>
      <Root
        {...{
          ...childProps,
          value,
          name,
          onChange: (e) => form.setFieldValue(name, e.target.value),
          clearField: () => form.setFieldValue(name, ''),
        }}
      />
    </FormField>
  );
};
