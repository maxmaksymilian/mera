import useTranslation from 'next-translate/useTranslation';

import { clsxm } from '@/lib';

import { Icon } from '@/components/commons/Icon/Icon';
import {
  ListHeaderType,
  SortType,
} from '@/components/commons/List/@types/List';

export type TableHeaderProps = {
  name: string;
  className?: string;
  activeKey: SortType;
  handleSort: () => void;
} & ListHeaderType;

export const TableHeader = ({
  name,
  customLabel,
  className,
  activeKey: { order, orderBy },
  handleSort,
}: TableHeaderProps) => {
  const { t } = useTranslation('list');

  return (
    <th>
      <span
        className={clsxm(
          'flex items-center gap-2.5 text-sm font-medium text-gray',
          orderBy === name && 'font-semibold text-navy',
          className
        )}
      >
        <>
          {t(`header.${customLabel || name}`)}
          <button onClick={handleSort}>
            <Icon
              name='sort'
              className={clsxm(
                orderBy === name && order === 'asc' && 'rotate-180 fill-navy'
              )}
            />
          </button>
        </>
      </span>
    </th>
  );
};
