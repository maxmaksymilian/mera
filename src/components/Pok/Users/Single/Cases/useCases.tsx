import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { useEffect, useState } from 'react';

import { Without } from '@/lib/api';
import { useApiQuery } from '@/hooks/api/useApiQuery';

import { FiltersProps } from '@/components/commons/Filters/Filters';
import { useForm } from '@/components/commons/Form/useForm';
import {
  ListObjectType,
  ListRecordType,
} from '@/components/commons/List/@types/List';

import {
  casesFilters as initialValues,
  casesHeaders,
  MyCaseType,
} from './CasesModel';

export const useCases = () => {
  const { query } = useRouter();
  const { t } = useTranslation('common');
  const [isOpen, setIsOpen] = useState(false);

  const filters: Without<FiltersProps, 'children'> = {
    form: useForm({
      initialValues,
      onSubmit: () => {
        null;
      },
    }),
  };

  const { data, refetch, ...apiQuery } = useApiQuery({
    route: 'POK_PROFILE_CASES',
    values: { ...filters.form.values, page: Number(query?.page) || 1 },
    params: { id: typeof query.id === 'string' ? query.id : '' },
  });

  const cases = data?.items || [];
  const pagination = data?.pagination || null;

  const table: ListObjectType = {
    ...casesHeaders,
    id: 'my-cases-table',
    cardType: 'secondary',
    form: filters.form,
    records: cases.reduce(
      (prev: ListRecordType[], current: MyCaseType): ListRecordType[] => [
        ...prev,
        {
          id: current.id,
          cardData: {
            number: current.number,
            title: current.title,
            description: current.description,
            link: `/pok/lista-spraw/${query.id}/${current.id}`,
            linkButton: {
              link: `/pok/lista-spraw/${query.id}/${current.id}`,
              content: 'viewDetails',
            },
          },
          data: {
            number: {
              value: current.number,
              properties: {
                link: `/pok/lista-spraw/${query.id}/${current.id}`,
              },
              hideOnMobile: true,
            },
            created_at: {
              value: current.created_at,
            },
            type: {
              value: t(`cases.status.${current.type}`),
            },
            status: {
              value: current.status,
            },
            description: {
              value: current.description,
              properties: {
                title: current.title,
              },
              hideOnMobile: true,
            },
          },
        },
      ],
      []
    ),
  };

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.form.values, query?.page]);

  return {
    filters,
    isOpen,
    table,
    pagination,
    t,
    refetch,
    setIsOpen,
    ...apiQuery,
  };
};
