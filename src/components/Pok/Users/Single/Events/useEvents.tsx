import { useEffect } from 'react';

import { Without } from '@/lib/api';
import { useApiQuery } from '@/hooks/api/useApiQuery';

import { FiltersProps } from '@/components/commons/Filters/Filters';
import { useForm } from '@/components/commons/Form/useForm';

import { EventsProps } from './Events';
import { eventsFilters as initialValues } from './EventsModel';

export const useEvents = ({ id }: EventsProps) => {
  const filters: Without<FiltersProps, 'children'> = {
    form: useForm({
      initialValues,
      onSubmit: () => {
        null;
      },
    }),
  };

  const { data, refetch, ...query } = useApiQuery({
    route: 'POK_CUSTOMER_EVENTS',
    params: { id },
    values: filters.form.values,
  });

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.form.values]);

  return { filters, data, ...query };
};
