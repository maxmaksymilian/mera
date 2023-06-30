import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { clsxm } from '@/lib/clsxm';
import { useProgressStore } from '@/lib/state/useProgressStore';

import { Container } from '@/components/commons/Container';
import { ProgressBar } from '@/components/commons/ProgressBar/ProgressBar';

import { IntroProps } from './components/Intro';
import { ProfileCompleted } from './components/ProfileCompleted';
import { SlidersProps } from './components/Sliders/Sliders';
import { links } from './components/Sliders/SlidersModel';

export type LayoutProps = {
  children?: React.ReactElement;
} & SlidersProps &
  IntroProps;

const Select = dynamic(
  () => import('./components/Select').then((m) => m.Select),
  {
    ssr: false,
  }
);

const Intro = dynamic(() => import('./components/Intro').then((m) => m.Intro), {
  ssr: false,
});

const Sliders = dynamic(
  () => import('./components/Sliders/Sliders').then((m) => m.Sliders),
  {
    ssr: false,
  }
);

export const Layout = ({ variant, children, ...props }: LayoutProps) => {
  const router = useRouter();
  const { setIsAnimating, isAnimating } = useProgressStore();

  useEffect(() => {
    router.events.on('routeChangeStart', () => setIsAnimating(true));
    router.events.on('routeChangeComplete', () => setIsAnimating(false));
    router.events.on('routeChangeError', () => setIsAnimating(false));
    return () => {
      router.events.off('routeChangeStart', () => setIsAnimating(true));
      router.events.off('routeChangeComplete', () => setIsAnimating(false));
      router.events.off('routeChangeError', () => setIsAnimating(false));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <>
      <ProgressBar {...{ isAnimating }} />
      <div className='flex flex-col gap-9 pt-32 pb-24'>
        <Container className={clsxm('flex flex-col md:gap-9')}>
          <div className='text-primary flex flex-col gap-7 pb-8 md:pb-0'>
            {variant && links[variant].length > 0 ? (
              <Select {...{ variant }} />
            ) : null}
            <Intro {...props} />
          </div>
          <Sliders {...{ variant }} />
          {variant === 'client' ? <ProfileCompleted /> : null}
          {children}
        </Container>
      </div>
    </>
  );
};
