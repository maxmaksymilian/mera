import { IconNameType } from '@/components/commons/Icon/IconModel';

export type ActiveLangsType = { [key: string]: IconNameType };

export type LangType = {
  icon: IconNameType;
  isOpen: boolean;
  setIsOpen: (e: boolean) => void;
  locale?: string;
};
