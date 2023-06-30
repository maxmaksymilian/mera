import useTranslation from 'next-translate/useTranslation';

import { Link } from '@/components/commons/Link';
import { links } from '@/components/Layouts/App/Header/HeaderModel';

export const GuestList = () => {
  const { t } = useTranslation('common');
  return (
    <>
      <ul className='hidden items-center gap-4 md:flex lg:gap-12'>
        {links.map((link, index) => (
          <Link href={link.path} key={index}>
            <li className='cursor-pointer font-primary'>
              {t(`header.link.${link.name}`)}
            </li>
          </Link>
        ))}
      </ul>
    </>
  );
};
