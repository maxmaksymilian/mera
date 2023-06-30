import { useRouter } from 'next/router';
import { useRef, useState } from 'react';

import { useOnClickOutside } from '@/hooks/useOnClickOutside';

import { IconNameType } from '@/components/commons/Icon/IconModel';
import { LangType } from '@/components/Layouts/App/Header/@types/LangType';

import { activeLanguages } from './LangSwitcherModel';

export const useLangSwitcher = () => {
  const { locales, locale, push, asPath } = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useOnClickOutside(ref, () => setIsOpen(false));

  const switchToLocale = (locale: string) => {
    const path = asPath;
    setIsOpen(false);
    return push(path, path, { locale });
  };

  const getLangName = (locale: string): IconNameType =>
    Object.keys(activeLanguages).includes(locale)
      ? activeLanguages[locale]
      : 'english';

  const languages =
    locales?.reduce<Pick<LangType, 'icon' | 'locale'>[]>(
      (prev, current) => [
        ...prev,
        { icon: getLangName(current), locale: current },
      ],
      []
    ) || [];

  return {
    ref,
    isOpen,
    setIsOpen,
    languages,
    locale,
    switchToLocale,
    getLangName,
  };
};
