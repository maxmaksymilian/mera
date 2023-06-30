import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { useEffect } from 'react';

import { Without } from '@/lib/api';
import { useApiQuery } from '@/hooks/api/useApiQuery';
import { useFileDownload } from '@/hooks/useFileDownload';

import { FiltersProps } from '@/components/commons/Filters/Filters';
import { useForm } from '@/components/commons/Form/useForm';
import {
  ListObjectType,
  ListRecordType,
} from '@/components/commons/List/@types/List';
import { FilterType } from '@/components/commons/List/components/Table/components/TableFilter/TableFilterModel';

import { ReportsProps } from './Reports';
import {
  initialValues,
  ReportsCardsType,
  ReportsOrdersType,
  reportsTableHeaders,
  ReportsTicketsType,
} from './ReportsModel';

export const useReports = ({ type }: ReportsProps) => {
  const { query } = useRouter();
  const { t } = useTranslation();
  const { getFile } = useFileDownload({ route: 'POK_REPORTS_EXPORT' });

  const filters: Without<FiltersProps, 'children'> = {
    form: useForm({
      initialValues,
      onSubmit: () => {
        null;
      },
    }),
  };

  const { data, refetch, ...apiQuery } = useApiQuery({
    route: 'POK_REPORTS',
    params: { type },
    values: {
      ...filters.form.values,
      page: typeof query?.page === 'string' ? query.page : '1',
    },
  });

  const reports = data?.items || [];
  const pagination = data?.pagination || null;

  const getTransformData = () => {
    if (type === 'tickets') {
      return reports.reduce(
        (
          prev: ListRecordType[],
          current: ReportsTicketsType,
          index: number
        ): ListRecordType[] => [
          ...prev,
          {
            id: `${current.id}-${index}`,
            data: {
              type: {
                value: t(`list:common.reports.type.${current.type}`),
              },
              name: {
                value: current.name,
              },
              price: {
                value: current.price,
              },
              ticket_count: {
                value: current.ticket_count,
              },
              price_sum_net: {
                value: current.price_sum_net,
              },
              price_vat: {
                value: current.price_vat,
              },
              price_sum: {
                value: current.price_sum,
              },
            },
          },
        ],
        []
      );
    } else if (type === 'cards') {
      return reports.reduce(
        (
          prev: ListRecordType[],
          current: ReportsCardsType,
          index: number
        ): ListRecordType[] => [
          ...prev,
          {
            id: `${current.id}-${index}`,
            data: {
              type: {
                value: t(`form:options.type.${current.type}`),
              },
              number: {
                value: current.number,
              },
              expiration_date: {
                value: current.expiration_date || '',
              },
              name: {
                value: current.name,
              },
              owner_id: {
                value: current.owner_id,
              },
              owner_name: {
                value: current.owner_name,
              },
              user_id: {
                value: current.user_id,
              },
              user_name: {
                value: current.user_name,
              },
              lock_date: {
                value: current.lock_date,
              },
            },
          },
        ],
        []
      );
    } else {
      return reports.reduce(
        (
          prev: ListRecordType[],
          current: ReportsOrdersType,
          index: number
        ): ListRecordType[] => [
          ...prev,
          {
            id: `${current.id}-${index}`,
            data: {
              created_at: {
                value: current.created_at,
              },
              payment_method: {
                value: t(`list:common.payment.${current.payment_method}`),
              },
              order_number: {
                value: current.order_number,
              },
              name: {
                value: current.name,
              },
              price: {
                value: current.price,
              },
              ticket_count: {
                value: current.ticket_count,
              },
              price_sum_net: {
                value: current.price_sum_net,
              },
              price_vat: {
                value: current.price_vat,
              },
              price_sum: {
                value: current.price_sum,
              },
            },
          },
        ],
        []
      );
    }
  };

  const table: ListObjectType = {
    ...reportsTableHeaders[type],
    cardType: 'primary',
    showFilters: true,
    form: filters.form,
    updateFilter: (data) => {
      const currentFilters = filters.form.values.filter;
      filters.form.setFieldValue(
        'filter',
        data.type === '' || !data.type
          ? [
              ...currentFilters.filter(
                ({ field }: FilterType) => field !== data.field
              ),
            ]
          : [
              ...currentFilters.filter(
                ({ field }: FilterType) => field !== data.field
              ),
              {
                ...data,
                value:
                  data.second_value && data.second_value !== ''
                    ? `${data.value};${data.second_value}`
                    : data.value,
              },
            ]
      );
    },
    records: getTransformData(),
  };

  const exportData = (value: string) => {
    getFile({
      values: {
        params: { type },
        format: value,
        ...filters.form.values,
      },
      extension: value,
      filename: 'report',
    });
  };

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.form.values, query?.page]);

  return {
    table,
    refetch,
    filters,
    exportData,
    pagination,
    ...apiQuery,
  };
};
