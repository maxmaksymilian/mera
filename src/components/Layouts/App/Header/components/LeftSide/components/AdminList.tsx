import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

import { clsxm } from '@/lib';
import { useAuth } from '@/hooks/useAuth';

import { Icon } from '@/components/commons/Icon/Icon';
import { Link } from '@/components/commons/Link';
import { adminLinks } from '@/components/Layouts/App/Header/HeaderModel';

export const AdminList = () => {
  const { hasAccess } = useAuth();
  const { asPath } = useRouter();
  const { t } = useTranslation('common');

  return (
    <div className='md:pt-3'>
      <ul className='hidden items-center gap-1 text-base md:flex lg:gap-4'>
        {adminLinks
          .filter(({ permission }) => !permission || hasAccess(permission))
          .map((link, index) => (
            <Link href={link.path} key={index}>
              <li
                className={clsxm(
                  'text-primary flex cursor-pointer decoration-4',
                  'hover:text-navy hover:underline hover:underline-offset-[35px] active:text-navy active:underline active:underline-offset-[25px]',
                  asPath.includes(link.path) &&
                    'font-bold text-navy underline underline-offset-[35px]'
                )}
              >
                {link.icon ? <Icon name={link.icon} className='mr-2' /> : null}
                {t(`header.link.${link.name}`)}
              </li>
            </Link>
          ))}
      </ul>
    </div>
  );
};
