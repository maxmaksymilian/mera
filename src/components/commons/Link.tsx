import { default as NextLink, LinkProps as NextLinkProps } from 'next/link';
import React from 'react';

export type LinkProps = {
  href: string;
  children: React.ReactNode;
  openNewTab?: boolean;
  nextLinkProps?: Omit<NextLinkProps, 'href'>;
} & React.ComponentPropsWithRef<'a'>;

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, href, openNewTab, nextLinkProps, ...rest }, ref) => {
    const isNewTab =
      openNewTab !== undefined
        ? openNewTab
        : href && !href.startsWith('/') && !href.startsWith('#');

    if (!isNewTab) {
      return (
        <NextLink href={href} {...nextLinkProps}>
          <a ref={ref} {...rest}>
            {children}
          </a>
        </NextLink>
      );
    }

    return (
      <a ref={ref} rel='noopener noreferrer' href={href} {...rest}>
        {children}
      </a>
    );
  }
);
