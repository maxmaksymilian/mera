import { FormikContextType, FormikValues } from 'formik';

import { Without } from '@/lib/api';

import { IconNameType } from '@/components/commons/Icon/IconModel';
import { CardType } from '@/components/commons/List/components/CardsList';
import { FilterType } from '@/components/commons/List/components/Table/components/TableFilter/TableFilterModel';

export const HeaderTypes = [
  'TEXT',
  'DATE',
  'DATE_TIME',
  'CONTENT',
  'PRICE',
  'LINK',
  'STATUS',
] as const;

export type ListHeaderType = {
  key: string;
  customLabel?: string;
  type?: (typeof HeaderTypes)[number];
  columnRecordClassName?: string;
};

export type ListActionType = {
  key: string;
  expired?: boolean;
  handleClick?: () => void;
  icons: {
    name: IconNameType;
    handleClick: () => void;
  }[];
};

export type SortType = {
  orderBy: string;
  order: 'asc' | 'desc';
};

export type ListRecordType = {
  id: string;
  data: {
    [key: string]: {
      value: string | number;
      properties?: { [key: string]: string | number };
      hideOnMobile?: boolean;
    };
  };
  cardData?: {
    title: string;
    number?: string;
    description?: string;
    link?: string;
    linkButton?: {
      content: string;
      link: string;
    };
    actionButton?: {
      content: string;
      handleClick: () => void;
    };
  };
  actions?: ListActionType[];
};

export type ListProps = {
  id?: string;
  status: string;
  showFilters?: boolean;
  updateFilter?: (data: FilterType) => void;
  isLoading?: boolean;
  isRefetching?: boolean;
  cardType: keyof typeof CardType;
  headers: ListHeaderType[];
  records: ListRecordType[];
  form?: FormikContextType<FormikValues>;
};

export type ListObjectType = Without<
  ListProps,
  'isLoading' | 'isRefetching' | 'status'
>;
