import { clsxm } from '@/lib';

export type CheckboxProps = {
  label: string;
  name: string;
  variant?: 'small' | 'default';
  className?: string;
  checked?: boolean | string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Checkbox = ({
  label,
  name,
  className,
  checked,
  variant = 'default',
  handleChange,
}: CheckboxProps) => (
  <div
    className={clsxm(
      'checkbox-container relative flex h-8 cursor-pointer items-center gap-5',
      variant === 'small' && 'checkbox-container-small h-5'
    )}
  >
    <label
      htmlFor={name}
      className={clsxm(
        'flex h-full items-center text-base leading-6 text-gray',
        variant === 'small' && 'text-black'
      )}
    >
      <input
        type='checkbox'
        name={name}
        id={name}
        className={clsxm(
          'input-checkbox',
          variant === 'small' && 'input-checkbox-small',
          className
        )}
        onChange={(e) => handleChange(e)}
        checked={typeof checked === 'boolean' ? checked : checked === '1'}
      />
      <span className='checkmark absolute left-0 top-0 bg-black'>&nbsp;</span>
      {label}
    </label>
  </div>
);
