import { IconNameType } from '@/components/commons/Icon/IconModel';

export type LinkType = {
  name: string;
  path: string;
  icon?: IconNameType;
  permission?: string;
};
