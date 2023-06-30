import { useScreen } from '@/hooks/useScreen';

import { ListProps } from './@types/List';
import { CardsList } from './components/CardsList';
import { Table } from './components/Table/Table';

export const List = ({ headers, showFilters = false, ...props }: ListProps) => {
  const { isMdUp } = useScreen();
  const Component = isMdUp ? Table : CardsList;
  const headersWithType = headers.map((header) => ({
    ...header,
    type: header.type || 'TEXT',
  }));

  return <Component {...{ ...props, headers: headersWithType, showFilters }} />;
};
