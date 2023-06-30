import { useFormikContext } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import { ComponentProps } from 'react';

import { clsxm } from '@/lib';

type CheckboxProps = {
  name: string;
  className?: string;
  variant?: 'small' | 'default';
  multiple?: boolean;
  value?: string;
} & ComponentProps<'input'>;

export const Checkbox = ({
  className,
  variant,
  children,
  multiple,
  value,
  ...props
}: CheckboxProps) => {
  const { t } = useTranslation('form');
  const form = useFormikContext();
  const { value: activeValue, error } = form.getFieldMeta<string | string[]>(
    props.name
  );

  return (
    <>
      <div
        className={clsxm(
          'checkbox-container relative flex min-h-[32px] cursor-pointer items-start justify-start gap-5',
          variant === 'small' && 'checkbox-container-small min-h-[20px]'
        )}
      >
        <label
          className={clsxm(
            'flex min-h-[32px] cursor-pointer items-center text-base leading-6 text-gray',
            variant === 'small' && 'min-h-[20px] text-black'
          )}
        >
          <input
            {...{
              ...props,
              checked:
                multiple && typeof activeValue !== 'string' && value
                  ? activeValue.includes(value)
                  : activeValue !== '0',
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                if (multiple && typeof activeValue !== 'string' && value) {
                  form.setFieldValue(
                    props.name,
                    e.target.checked
                      ? [...activeValue, value]
                      : [...activeValue.filter((id) => id !== value)]
                  );
                } else {
                  form.setFieldValue(props.name, e.target.checked ? '1' : '0');
                }
              },
              type: 'checkbox',
            }}
            className={clsxm(
              'input-checkbox',
              variant === 'small' && 'input-checkbox-small',
              error && 'border-error focus:border-error',
              className
            )}
          />
          <span className='checkmark absolute left-0 top-0 bg-black'>
            &nbsp;
          </span>
          {children}
        </label>
      </div>
      {error ? (
        <p className='ml-12 mt-2.5 text-xs text-error'>
          {t(`validation.${error}`)}
        </p>
      ) : null}
    </>
  );
};
