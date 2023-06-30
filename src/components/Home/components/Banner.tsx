import { useAppStore } from '@/lib';

import { Button } from '@/components/commons/Button';
import { Link } from '@/components/commons/Link';

export type BannerProps = {
  content: string;
  buttonText: string;
  href: string;
};

export const Banner = ({ content, buttonText, href }: BannerProps) => {
  const { token } = useAppStore();

  return (
    <div className='flex min-w-full flex-col justify-between gap-6 rounded-2xl bg-cloud p-8 md:flex-row md:items-center md:p-16'>
      <h1 className='max-w-screen-md'>{content}</h1>
      <Link href={token === '' ? '/auth/logowanie' : href}>
        <Button rounded={true}>{buttonText}</Button>
      </Link>
    </div>
  );
};
