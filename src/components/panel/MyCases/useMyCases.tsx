import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { useEffect, useState } from 'react';

import { Without } from '@/lib/api';
import { shortenEventTitle } from '@/lib/helpers';
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
} from './MyCasesModel';

export const useMyCases = () => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenReturn, setIsOpenReturn] = useState(false);
  const filters: Without<FiltersProps, 'children'> = {
    form: useForm({
      initialValues,
      onSubmit: () => {
        null;
      },
    }),
    button: {
      children: 'createNewCase',
      handleClick: () => setIsOpen(true),
    },
  };

  const { data, refetch, ...query } = useApiQuery({
    route: 'PROFILE_MY_CASES',
    values: {
      ...filters.form.values,
      page: typeof router.query?.page === 'string' ? router.query.page : '1',
    },
  });

  const cases: MyCaseType[] = data?.items || [];
  const pagination = data?.pagination || null;

  const table: ListObjectType = {
    ...casesHeaders,
    id: 'my-cases-table',
    cardType: 'secondary',
    form: filters.form,
    records: cases.reduce(
      (prev: ListRecordType[], current): ListRecordType[] => [
        ...prev,
        {
          id: current.id,
          cardData: {
            number: current.number,
            title: current.title,
            description: current.description,
            link: `/panel/sprawy/${current.id}`,
            linkButton: {
              link: `/panel/sprawy/${current.id}`,
              content: 'viewDetails',
            },
          },
          data: {
            number: {
              value: current.number,
              properties: {
                link: `/panel/sprawy/${current.id}`,
              },
              hideOnMobile: true,
            },
            created_at: {
              value: current.created_at,
            },
            updated_at: {
              value: current.updated_at,
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
                title: shortenEventTitle(current.title),
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
  }, [filters.form.values, router.query?.page]);

  return {
    filters,
    isOpen,
    isOpenReturn,
    router,
    pagination,
    table,
    setIsOpen,
    refetch,
    setIsOpenReturn,
    t,
    ...query,
  };
};
