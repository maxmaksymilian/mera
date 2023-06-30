import useTranslation from 'next-translate/useTranslation';

import { Link } from '@/components/commons/Link';
import { LinkType } from '@/components/Layouts/App/Header/@types/LinkType';

type ListProps = {
  links: LinkType[];
};

export const List = ({ links }: ListProps) => {
  const { t } = useTranslation('common');

  return (
    <div className='flex flex-col gap-5 px-9 pt-8 pb-11'>
      {links.map((link, index) => (
        <Link key={index} href={link.path}>
          <li className='cursor-pointer text-base'>
            {t(`header.link.${link.name}`)}
          </li>
        </Link>
      ))}
    </div>
  );
};
