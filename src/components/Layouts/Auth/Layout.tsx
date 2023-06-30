import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

import { clsxm } from '@/lib';

import { Icon } from '@/components/commons/Icon/Icon';
import { Link } from '@/components/commons/Link';

import BusImage from '/public/images/auth/bus.webp';

export type LayoutProps = {
  title: string;
  children: React.ReactNode;
  content?: string;
  image?: StaticImageData;
};

export const Layout = ({ title, content, children, image }: LayoutProps) => {
  const { pathname } = useRouter();
  const { t } = useTranslation('common');

  const isPok = pathname.includes('/pok');

  return (
    <div className='w-full items-stretch lg:flex'>
      <div
        className={clsxm(
          'w-full px-9 lg:flex lg:w-1/2 lg:justify-end',
          !isPok && 'lg:items-center lg:px-0'
        )}
      >
        <div className='w-full lg:max-w-[620px]'>
          {isPok ? (
            <div className='mx-auto w-full max-w-[430px] pt-8 lg:mx-0 lg:pb-52'>
              <Link href='/'>
                <Icon name='logo' />
              </Link>
            </div>
          ) : null}
          <div className='mx-auto flex max-w-[430px] flex-col gap-12 py-36 lg:mx-0 lg:py-0'>
            <div className='flex flex-col gap-8'>
              <h1 className='text-2xl font-normal md:text-lg'>
                {t(`auth.${title}`)}
              </h1>
              {content ? (
                <p className='text-sm text-gray md:text-base'>
                  {t(`auth.${content}`)}
                </p>
              ) : null}
            </div>
            {children}
          </div>
        </div>
      </div>
      <div className='relative hidden min-h-screen w-1/2 lg:block'>
        <Image
          className='z-0'
          src={image || BusImage}
          alt={t(`auth.${title}`)}
          layout='fill'
          objectFit='cover'
          objectPosition='center'
          priority
        />
      </div>
    </div>
  );
};
