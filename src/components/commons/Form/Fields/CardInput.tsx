import { useFormikContext } from 'formik';
import {
  ChangeEvent,
  ComponentProps,
  useEffect,
  useRef,
  useState,
} from 'react';

import { clsxm } from '@/lib';

import { FormField, useFormField } from '@/components/commons/Form/FormField';

type CardInputProps = {
  name: string;
  firstMax: number;
  secondMax: number;
  label?: string;
  className?: string;
} & ComponentProps<'input'>;

export const CardInput = ({
  className,
  firstMax,
  secondMax,
  ...props
}: CardInputProps) => {
  const form = useFormikContext();
  const { value, error } = form.getFieldMeta<
    string | number | readonly string[] | undefined
  >(props.name);

  const [values, setValues] = useState({
    first: value?.toString().substring(0, firstMax) || '',
    second: value?.toString().substring(firstMax, firstMax + secondMax) || '',
  });

  const firstInputRef = useRef<HTMLInputElement>(null);
  const secondInputRef = useRef<HTMLInputElement>(null);

  const { formFieldProps } = useFormField(props);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, name: string) => {
    const value = e.target.value.replace(/\D/g, '');

    if (name === 'first' && value.length >= 6) {
      secondInputRef?.current?.focus();
    }

    setValues({ ...values, [name]: value });
  };

  const generatePlaceholder = (count: number) => {
    let placeholder = '';
    for (let i = 0; i < count; i++) {
      placeholder += '_';
    }
    return placeholder;
  };

  useEffect(() => {
    const { first, second } = values;
    const combined = first + second;
    form.setFieldValue(props.name, combined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.first, values.second]);

  return (
    <FormField {...formFieldProps}>
      <div
        className={clsxm(
          'flex h-12 items-stretch justify-start px-5',
          'focus:border-1 rounded-xs border outline-0 focus:border-navy',
          error
            ? 'border-error focus:border-error'
            : 'border-cloud focus:border-cloud',
          className
        )}
      >
        <input
          ref={firstInputRef}
          type='text'
          name='first'
          placeholder={generatePlaceholder(firstMax)}
          className='w-20 border-none'
          maxLength={firstMax}
          value={values.first}
          onChange={(e) => handleChange(e, 'first')}
        />
        <div className='w-24 text-center leading-10'>* * * * * *</div>
        <input
          ref={secondInputRef}
          name='second'
          placeholder={generatePlaceholder(secondMax)}
          className='w-24 border-none px-5 focus:outline-none md:w-36'
          maxLength={secondMax}
          value={values.second}
          onChange={(e) => handleChange(e, 'second')}
        />
      </div>
    </FormField>
  );
};
