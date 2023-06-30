import useTranslation from 'next-translate/useTranslation';

import { Button } from '@/components/commons/Button';
import { Link } from '@/components/commons/Link';

const NotFoundPage = () => {
  const { t } = useTranslation('common');

  return (
    <div className='flex w-full items-center justify-center py-40'>
      <div className='flex items-center p-16'>
        <div className='container mx-auto my-8 flex flex-col items-center justify-center px-5'>
          <div className='max-w-md text-center'>
            <h2 className='mb-8 text-9xl font-extrabold'>
              <span className='sr-only'>Error</span>404
            </h2>
            <p className='text-2xl font-semibold md:text-3xl'>
              {t('pages.404.title')}
            </p>
            <p className='mt-4 mb-8'>{t('pages.404.content')}</p>
            <Link href='/'>
              <Button type='button'>{t('pages.404.linkText')}</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
