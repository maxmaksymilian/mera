import { clsxm } from '@/lib';

import { Icon } from '@/components/commons/Icon/Icon';

export type HistorySectionFilterProps = {
  name: string;
  className?: string;
  handleFilter: () => void;
};

export const HistorySectionFilter = ({
  name,
  handleFilter,
}: HistorySectionFilterProps) => {
  return (
    <span
      className={clsxm(
        'text-subBase flex items-center gap-2.5 font-medium text-gray'
      )}
    >
      {name}
      <button onClick={handleFilter}>
        <Icon name='sort' />
      </button>
    </span>
  );
};
