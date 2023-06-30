import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { clsxm } from '@/lib/clsxm';
import { useAuth } from '@/hooks/useAuth';

import { Link } from '@/components/commons/Link';
import { LinkType } from '@/components/Layouts/App/Header/@types/LinkType';

import { links } from './SlidersModel';

export type SlidersProps = {
  variant?: keyof typeof links;
};

export const Sliders = ({ variant }: SlidersProps) => {
  const { hasAccess } = useAuth();
  const { asPath, query } = useRouter();
  const { t } = useTranslation('common');

  if (!variant) {
    return null;
  }

  const activeLinks: { [key: string]: any } = {
    client: links.client,
    admin: links.admin.filter(
      (link: any) => !link.permission || hasAccess(link.permission)
    ),
    reports: links.reports,
    administration: links.administration,
  };

  return (
    <div
      className={clsxm(
        'hidden border-b-gray md:block md:border-b md:pb-5',
        activeLinks[variant].length === 0 && 'hidden md:hidden'
      )}
    >
      <Swiper slidesPerView='auto' id='layout-links'>
        {activeLinks[variant].map((link: LinkType, index: number) => {
          const currentLink =
            link.path.includes('{id}') && typeof query.id === 'string'
              ? link.path.replaceAll('{id}', query.id)
              : link.path;

          return (
            <SwiperSlide key={index}>
              <Link
                href={currentLink}
                className={clsxm(
                  'text-primary cursor-pointer decoration-4 md:pr-7',
                  'hover:text-navy hover:underline hover:underline-offset-[25px] active:text-navy active:underline active:underline-offset-[25px]',
                  ((asPath === '/panel' && asPath === currentLink) ||
                    (currentLink !== '/panel' &&
                      asPath.includes(currentLink))) &&
                    'font-bold text-navy underline underline-offset-[25px]'
                )}
              >
                {t(`panel.links.${link.name}`)}
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
