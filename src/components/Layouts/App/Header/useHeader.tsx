import { useRouter } from 'next/router';

import { headerExcludes } from './HeaderModel';

export const useHeader = () => {
  const { pathname } = useRouter();

  const checkGroupPath = headerExcludes?.groupPath
    ? headerExcludes?.groupPath.some((link) => pathname.includes(link))
    : false;

  const checkLink = headerExcludes?.links
    ? headerExcludes?.links.some((link) => pathname === link)
    : false;

  const hideHeader = checkGroupPath || checkLink;

  return { hideHeader, pathname };
};
