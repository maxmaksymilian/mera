import { clsxm } from '@/lib';

type OverlayProps = {
  isOpen: boolean;
  handler?: () => void;
  variant?: 'default' | 'transparent';
  className?: string;
};

export const Overlay = ({
  variant = 'default',
  isOpen,
  className,
}: OverlayProps) => {
  const variantMap = {
    default: 'visible bg-opacity-90',
    transparent: 'visible bg-opacity-0',
  };

  return (
    <div
      className={clsxm(
        'fixed inset-0 cursor-pointer bg-gray opacity-80 transition-opacity',
        isOpen ? variantMap[variant] : 'invisible bg-opacity-0',
        className
      )}
    ></div>
  );
};
