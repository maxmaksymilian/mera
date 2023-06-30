import { useState } from 'react';

import { FilterType, TableFilterProps } from './TableFilterModel';

export const useTableFilter = ({ field, updateData }: TableFilterProps) => {
  const [filter, setFilter] = useState<FilterType>({
    type: '',
    value: '',
    second_value: '',
    field,
  });

  const updateFilter = (
    key: 'type' | 'value' | 'second_value',
    value: string | number | null
  ) => {
    setFilter((prev) => ({
      ...prev,
      [key]: value,
    }));
    updateData({ ...filter, [key]: value });
  };

  return { filter, updateFilter };
};
