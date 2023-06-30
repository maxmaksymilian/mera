import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Without } from '@/lib/api';
import { useApiQuery } from '@/hooks/api/useApiQuery';

import { FiltersProps } from '@/components/commons/Filters/Filters';
import { useForm } from '@/components/commons/Form/useForm';

import { eventsFilters as initialValues } from './EventsModel';

export const useEvents = () => {
  const router = useRouter();
  const [active, setActive] = useState<'incoming' | 'ended'>('incoming');

  const filters: Without<FiltersProps, 'children'> = {
    form: useForm({
      initialValues,
      onSubmit: () => {
        null;
      },
    }),
    button: {
      children: 'checkEvents',
      handleClick: () => {
        router.push('/wydarzenia');
      },
    },
  };

  const { data, refetch, ...query } = useApiQuery({
    route: 'PROFILE_MY_EVENTS',
    values: filters.form.values,
  });

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.form.values]);

  return { active, setActive, filters, data, ...query };
};
