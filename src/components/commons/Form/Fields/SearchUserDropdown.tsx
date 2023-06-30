import { useFormikContext } from 'formik';

import { FormField, useFormField } from '@/components/commons/Form/FormField';
import Root, {
  SearchUserDropdownProps,
} from '@/components/commons/Form/Ui/SearchUserDropdown/SearchUserDropdown';

export const SearchUserDropdown = ({ ...props }: SearchUserDropdownProps) => {
  const { name } = props;
  const { formFieldProps } = useFormField(props);
  const { getFieldMeta, setFieldValue } = useFormikContext();
  const { value } = getFieldMeta<string>(name);

  return (
    <FormField {...{ ...formFieldProps, className: 'relative' }}>
      <Root
        {...{
          ...props,
          value,
          name,
          handleChange: (data) =>
            setFieldValue(name, data?.id ? data.id : null),
        }}
      />
    </FormField>
  );
};
