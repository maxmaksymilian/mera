import { useLangSwitcher } from '@/components/Layouts/App/Header/components/LangSwitcher/useLangSwitcher';

import { Item } from './components/Item';
export const LangSwitcher = () => {
  const { ref, isOpen, languages, locale, setIsOpen, getLangName } =
    useLangSwitcher();

  return (
    <div className='relative flex flex-col px-3' ref={ref}>
      <Item {...{ icon: getLangName(locale || 'en'), isOpen, setIsOpen }} />
      {isOpen && (
        <ul className='absolute bottom-10 right-0 flex min-w-full flex-col gap-4 rounded-xs bg-white p-3 drop-shadow-md md:bottom-[auto] md:top-10'>
          {languages?.map((lang) => (
            <li key={lang.locale}>
              <Item {...{ ...lang, isOpen, setIsOpen }} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
