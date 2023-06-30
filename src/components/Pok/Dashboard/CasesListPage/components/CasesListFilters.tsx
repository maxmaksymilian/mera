import { Without } from '@/lib/api';
import { casesStatusOptions } from '@/lib/options/options';
import { useApiQuery } from '@/hooks/api/useApiQuery';

import { Filters, FiltersProps } from '@/components/commons/Filters/Filters';
import { RangeDatepicker } from '@/components/commons/Form/Fields/RangeDatepicker';
import { SearchInput } from '@/components/commons/Form/Fields/SearchInput';
import { Select } from '@/components/commons/Form/Fields/Select/Select';
import { options } from '@/components/panel/MyCases/MyCasesModel';

type Employee = {
  id: string;
  profile: {
    first_name: string;
    last_name: string;
  };
};

type CasesListFiltersProps = {
  filters: Without<FiltersProps, 'children'>;
};

export const CasesListFilters = ({ filters }: CasesListFiltersProps) => {
  const { data, refetch, ...query } = useApiQuery({
    route: 'EMPLOYEE_LIST',
  });

  const employees = data?.map((employee: Employee) => ({
    name: `${employee.profile.first_name} ${employee.profile.last_name}`,
    value: employee.id,
  }));

  return (
    <div className='filters py-9'>
      <Filters {...{ ...filters, className: 'mb-5' }}>
        <SearchInput name='search' className='h-12' placeholder='searchCase' />
        <Select
          name='type'
          options={options.type}
          placeholder='caseType'
          className='md:w-[190px]'
          clearLabel='clear'
          isClear
        />
        <Select
          name='status'
          options={casesStatusOptions}
          placeholder='caseStatus'
          className='md:w-[180px]'
          clearLabel='clear'
          isClear
        />
        <Select
          name='guardian'
          options={employees}
          placeholder='operator'
          className='md:w-[150px]'
          clearLabel='clear'
          dynamic
          isClear
        />
        <RangeDatepicker
          fromName='date_from'
          toName='date_to'
          minYear={10}
          fromPlaceholder='choiceDate'
          toPlaceholder='choiceDate'
        />
      </Filters>
    </div>
  );
};
