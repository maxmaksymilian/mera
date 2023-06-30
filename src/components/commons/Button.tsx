import { clsxm } from '@/lib';

export type ButtonProps = {
  fullWidth?: boolean;
  rounded?: boolean;
  children: string | React.ReactNode;
  label?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'quaternary'
    | 'disabled'
    | 'download'
    | 'noStyling';
  disabled?: boolean;
  className?: string;
  handleClick?: (
    event: React.MouseEvent<HTMLButtonElement>
  ) => void | React.MouseEventHandler<HTMLButtonElement>;
};

enum ButtonVariants {
  primary = 'bg-navy text-white border border-navy',
  secondary = 'bg-white text-navy border border-navy',
  tertiary = 'bg-black text-white border border-black',
  quaternary = 'text-navy font-bold',
  disabled = 'bg-cloud text-gray border border-cloud',
  download = 'bg-[#212852] text-white',
  noStyling = 'px-0',
}

export const Button = ({
  fullWidth,
  rounded = true,
  disabled = false,
  children,
  label,
  type = 'button',
  variant = 'primary',
  handleClick,
  className,
}: ButtonProps) => (
  <button
    disabled={disabled}
    data-variant={variant}
    type={type}
    aria-label={label}
    onClick={handleClick}
    className={clsxm(
      'box-border h-14 cursor-pointer px-6 leading-base md:text-base',
      rounded && 'rounded-xs',
      fullWidth && 'w-full',
      ButtonVariants[variant],
      className
    )}
  >
    {children}
  </button>
);
