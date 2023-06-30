import useTranslation from 'next-translate/useTranslation';
import { useRef, useState } from 'react';

import { clsxm } from '@/lib';
import { Without } from '@/lib/api';
import { OptionProps } from '@/lib/options/options';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';

import { Button, ButtonProps } from './Button';
import { Icon } from './Icon/Icon';
import { IconNameType } from './Icon/IconModel';

export type DropdownProps = {
  icon?: IconNameType;
  options: OptionProps[];
  prefix?: string;
  handleClick: (value: string) => void;
} & Without<ButtonProps, 'handleClick'>;

export const Dropdown = ({
  icon,
  options,
  className,
  children,
  prefix,
  handleClick,
  ...props
}: DropdownProps) => {
  const { t } = useTranslation('form');
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useOnClickOutside(ref, () => setIsOpen(false));

  return (
    <div className='relative flex flex-col' ref={ref}>
      <Button
        className={clsxm(
          'flex h-14 items-center justify-between gap-2',
          className
        )}
        handleClick={() => setIsOpen((prev) => !prev)}
        {...props}
      >
        {icon ? <Icon name='download-file' /> : null}
        {t(`button.${children}`)}
        <Icon name='dropdown-icon-white' />
      </Button>
      <div
        className={clsxm(
          'mt-1.5 max-h-56 w-auto min-w-full overflow-y-auto border border-cloud bg-white shadow-md',
          isOpen ? 'absolute top-14 z-10' : 'hidden'
        )}
      >
        {options.map(({ name, value }) => (
          <div
            key={value}
            className={clsxm(
              'border-t border-cloud text-sm first-of-type:border-t-0 md:text-base',
              'flex h-12 w-full cursor-pointer items-center overflow-hidden whitespace-nowrap bg-white px-5 capitalize',
              'hover:bg-navy hover:text-white'
            )}
            onClick={() => {
              handleClick(value);
              setIsOpen(false);
            }}
          >
            {t(`options${prefix ? `.${prefix}` : ''}.${name}`)}
          </div>
        ))}
      </div>
    </div>
  );
};
