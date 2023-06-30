import { useEffect, useState } from 'react';

type UseScreenVariants =
  | 'width'
  | 'isXs'
  | 'isSm'
  | 'isSmUp'
  | 'isMd'
  | 'isMdUp'
  | 'isLg'
  | 'isLgUp'
  | 'isXl'
  | 'isXlUp'
  | 'isXxl'
  | 'isXxlUp'
  | 'isDesktop';

export type UseScreenReturn = Record<UseScreenVariants, boolean | number>;

export const breakpoint = {
  xs: 360,
  sm: 576,
  md: 768,
  lg: 1240,
  xl: 1420,
  xxl: 1920,
} as const;

export const isBrowser = () => typeof window !== 'undefined';

export const getWindowWidth = () => isBrowser() && window.innerWidth;

export const useScreen = (): UseScreenReturn => {
  const [width, setWidth] = useState<number | false>(false);
  const [isXs, setIsXs] = useState(false);
  const [isSm, setIsSm] = useState(false);
  const [isSmUp, setIsSmUp] = useState(false);
  const [isMd, setIsMd] = useState(false);
  const [isMdUp, setIsMdUp] = useState(false);
  const [isLg, setIsLg] = useState(false);
  const [isLgUp, setIsLgUp] = useState(false);
  const [isXl, setIsXl] = useState(false);
  const [isXlUp, setIsXlUp] = useState(false);
  const [isXxl, setIsXxl] = useState(false);
  const [isXxlUp, setIsXxlUp] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const handleResize = () => {
    const width = Number(getWindowWidth());
    setWidth(width);
    setIsXs(width <= breakpoint.xs);
    setIsSm(width >= breakpoint.xs && width < breakpoint.sm);
    setIsSmUp(width >= breakpoint.sm);
    setIsMd(width >= breakpoint.sm && width < breakpoint.md);
    setIsMdUp(width >= breakpoint.md);
    setIsLg(width >= breakpoint.md && width < breakpoint.lg);
    setIsLgUp(width >= breakpoint.lg);
    setIsXl(width >= breakpoint.lg && width < breakpoint.xl);
    setIsXlUp(width >= breakpoint.xl);
    setIsXxl(width >= breakpoint.xl && width < breakpoint.xxl);
    setIsXxlUp(width >= breakpoint.xxl);
    setIsDesktop(width >= breakpoint.lg);
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions,no-unused-expressions
    window && window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    width,
    isXs,
    isSm,
    isSmUp,
    isMd,
    isMdUp,
    isLg,
    isLgUp,
    isXl,
    isXlUp,
    isXxl,
    isXxlUp,
    isDesktop,
  };
};
