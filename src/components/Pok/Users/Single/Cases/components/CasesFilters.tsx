import { Without } from '@/lib/api';
import { casesStatusOptions } from '@/lib/options/options';

import { Filters, FiltersProps } from '@/components/commons/Filters/Filters';
import { RangeDatepicker } from '@/components/commons/Form/Fields/RangeDatepicker';
import { SearchInput } from '@/components/commons/Form/Fields/SearchInput';
import { Select } from '@/components/commons/Form/Fields/Select/Select';
import { options } from '@/components/panel/MyCases/MyCasesModel';

export const CasesFilters = (props: Without<FiltersProps, 'children'>) => (
  <Filters {...{ ...props, className: 'mb-5' }}>
    <SearchInput name='search' className='h-12' placeholder='searchCase' />
    <RangeDatepicker
      fromName='date_from'
      toName='date_to'
      minYear={10}
      fromPlaceholder='choiceDate'
      toPlaceholder='choiceDate'
    />
    <Select
      name='type'
      options={options.type}
      placeholder='caseType'
      className='md:w-[200px]'
      isClear
      clearLabel='clear'
    />
    <Select
      name='status'
      options={casesStatusOptions}
      placeholder='caseStatus'
      className='md:w-[200px]'
      isClear
      clearLabel='clear'
    />
  </Filters>
);
