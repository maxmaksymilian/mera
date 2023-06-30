import { useEffect, useState } from 'react';

import { Without } from '@/lib/api';
import { useApiQuery } from '@/hooks/api/useApiQuery';

import { FiltersProps } from '@/components/commons/Filters/Filters';
import { useForm } from '@/components/commons/Form/useForm';

import { cardsFilters as initialValues } from './MyCardsModel';

export const useMyCards = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const filters: Without<FiltersProps, 'children'> = {
    form: useForm({
      initialValues,
      onSubmit: () => {
        null;
      },
    }),
    button: {
      handleClick: () => setIsOpen(true),
      children: 'addNewCard',
    },
  };

  const { data, status, refetch, isLoading } = useApiQuery({
    route: 'PROFILE_MY_CARDS',
    values: filters.form.values,
  });

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.form.values]);

  return {
    data,
    status,
    isLoading,
    filters,
    isOpen,
    setIsOpen,
    refetch,
  };
};
