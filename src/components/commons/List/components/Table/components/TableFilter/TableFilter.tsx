import { recordFilterOptions } from '@/lib/options/options';

import Input from '@/components/commons/Form/Ui/Input';
import Select from '@/components/commons/Form/Ui/Select/Select';

import { secondInput, singleInput, TableFilterProps } from './TableFilterModel';
import { useTableFilter } from './useTableFilter';

export const TableFilter = (props: TableFilterProps) => {
  const { updateFilter, filter } = useTableFilter(props);

  return (
    <td className='!bg-white'>
      <div className='flex flex-col items-start gap-2 pb-2'>
        <Select
          {...{
            name: 'type',
            placeholder: 'choiceFilter',
            onChange: (value) => updateFilter('type', value),
            options: recordFilterOptions,
            className: 'w-[180px]',
            value: filter.type,
            isClear: true,
          }}
        />
        {singleInput.includes(filter.type) ? (
          <Input
            {...{
              name: 'value',
              placeholder: 'value',
              className: 'w-[180px]',
              value: filter.value,
              onChange: (e) => updateFilter('value', e.target.value),
              onBlur: (e) => updateFilter('value', e.target.value),
            }}
          />
        ) : null}
        {secondInput.includes(filter.type) ? (
          <Input
            {...{
              name: 'second_value',
              placeholder: 'value',
              className: 'w-[180px]',
              value: filter.second_value,
              onChange: (e) => updateFilter('second_value', e.target.value),
              onBlur: (e) => updateFilter('second_value', e.target.value),
            }}
          />
        ) : null}
      </div>
    </td>
  );
};
