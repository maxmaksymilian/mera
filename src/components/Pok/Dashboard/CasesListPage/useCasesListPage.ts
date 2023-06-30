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
import { MyCaseType } from '@/components/panel/MyCases/MyCasesModel';

import {
  casesListFilters as initialValues,
  casesListHeaders,
  newTabs,
} from './CasesListModel';

export const useCasesListPage = () => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [activeTab, setActiveTab] = useState<{ name: string; label: string }>(
    newTabs[0]
  );

  const filters: Without<FiltersProps, 'children'> = {
    form: useForm({
      initialValues,
      onSubmit: () => {
        null;
      },
    }),
  };

  const { data, refetch, ...query } = useApiQuery({
    route: 'POK_CASES_LIST',
    values: {
      tab: activeTab.name === 'archived' ? 'archived' : 'in_progress',
      page: typeof router.query?.page === 'string' ? router.query.page : '1',
      ...filters.form.values,
    },
  });

  const cases = data?.items || [];
  const pagination = data?.pagination || null;

  const table: ListObjectType = {
    ...casesListHeaders,
    id: 'cases-list-headers-table',
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
            link: `/pok/lista-spraw/${current.user.id}/${current.id}`,
            linkButton: {
              link: `/pok/lista-spraw/${current.user.id}/${current.id}`,
              content: 'viewDetails',
            },
          },
          data: {
            number: {
              value: current.number,
              properties: {
                link: `/pok/lista-spraw/${current.user.id}/${current.id}`,
              },
              hideOnMobile: true,
            },
            created_at: {
              value: current.created_at,
            },
            updated_at: {
              value: current.updated_at,
            },
            employee: {
              value: current?.employee
                ? current.employee.profile.first_name +
                  ' ' +
                  current.employee.profile.last_name
                : 'Nie przydzielono',
            },
            type: {
              value: t(`cases.status.${current.type}`),
            },
            status: {
              value: current.status,
            },
            description: {
              value: current.title,
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
  }, [filters.form.values, activeTab, router.query?.page]);

  return {
    activeTab,
    filters,
    table,
    setActiveTab,
    t,
    refetch,
    pagination,
    ...query,
  };
};
