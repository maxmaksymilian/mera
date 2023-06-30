import { clsxm } from '@/lib';

import { Icon } from '@/components/commons/Icon/Icon';
import { IconNameType } from '@/components/commons/Icon/IconModel';
import { Link } from '@/components/commons/Link';

export type AdministrationCardProps = {
  name: string;
  href: string;
  icon: IconNameType;
  className?: string;
  permission?: string;
};

export const AdministrationCard = ({
  name,
  href,
  icon,
  className,
}: AdministrationCardProps) => (
  <Link
    href={href}
    className={clsxm(
      'flex items-center gap-6 rounded-md bg-cloud px-[26px] py-5',
      className
    )}
  >
    <Icon name={icon} className='max-w-[40px]' />
    <p className='leading-6'>{name}</p>
    <Icon name='chevron' className='ml-auto -rotate-90' />
  </Link>
);
