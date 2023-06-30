import useTranslation from 'next-translate/useTranslation';

import { clsxm } from '@/lib';

import { Link, LinkProps } from '@/components/commons/Link';

export type BreakpointsListProps = {
  breakpoints?: ({ href?: string; dynamic?: boolean } & Pick<
    LinkProps,
    'children'
  >)[];
  hideOnMobile?: boolean;
};

export const BreakpointsList = ({
  breakpoints,
  hideOnMobile,
}: BreakpointsListProps) => {
  const { t } = useTranslation('common');

  if (!breakpoints) {
    return null;
  }

  return (
    <p
      className={clsxm(
        'text-primary flex gap-1 pb-2 text-base',
        hideOnMobile && 'hidden'
      )}
    >
      {breakpoints.map(({ href, children, dynamic }, index) => (
        <span
          key={`${href}-${index}`}
          className={clsxm('flex gap-1', !href && 'text-gray')}
        >
          {href ? (
            <Link {...{ href, className: 'text-navy' }}>
              {dynamic ? children : t(`panel.links.${children}`)}
            </Link>
          ) : dynamic ? (
            children
          ) : (
            t(`panel.links.${children}`)
          )}
          {index + 1 < breakpoints.length ? (
            <span className='text-gray'>&gt;</span>
          ) : null}
        </span>
      ))}
    </p>
  );
};
