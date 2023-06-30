import useTranslation from 'next-translate/useTranslation';

import { Icon } from '@/components/commons/Icon/Icon';
import { LangType } from '@/components/Layouts/App/Header/@types/LangType';
import { useLangSwitcher } from '@/components/Layouts/App/Header/components/LangSwitcher/useLangSwitcher';

export const Item = ({ icon, locale, isOpen, setIsOpen }: LangType) => {
  const { t } = useTranslation('common');
  const { switchToLocale } = useLangSwitcher();

  return (
    <>
      <button
        className='flex gap-4'
        onClick={() => {
          locale ? switchToLocale(locale) : setIsOpen(!isOpen);
        }}
      >
        <>
          <Icon name={icon} />
          <p className='text-[16px] text-gray'>
            {t(`header.language.${icon}`)}
          </p>
        </>
      </button>
    </>
  );
};
