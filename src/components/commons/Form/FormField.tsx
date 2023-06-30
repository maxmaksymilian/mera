import { useFormikContext } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import { PropsWithChildren } from 'react';

import { clsxm } from '@/lib';

type FormFieldType = {
  id: string;
  name: string;
  label?: string;
  className?: string;
} & PropsWithChildren;

export const useFormField = <
  P extends Pick<FormFieldType, 'name' | 'label' | 'className'>
>(
  props: P
) => {
  const { label, name, className, ...otherProps } = props;
  const id = name;

  return {
    formFieldProps: { id, name, label, className },
    childProps: { ...otherProps, id, name },
  };
};

export const FormField = ({
  children,
  name,
  id,
  label,
  className,
}: FormFieldType) => {
  const { t } = useTranslation('form');
  const form = useFormikContext();
  const { error } = form.getFieldMeta<
    string | number | readonly string[] | undefined
  >(name);

  return (
    <div className={clsxm('flex flex-col gap-2', className)}>
      {label ? (
        <label htmlFor={id}>{`${t(`label.${label.replaceAll('*', '')}`)}${
          label.includes('*') ? '*' : ''
        }`}</label>
      ) : null}
      {children}
      {error ? (
        <p className='text-xs text-error -mt-2'>{t(`validation.${error}`)}</p>
      ) : null}
    </div>
  );
};
