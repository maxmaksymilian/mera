import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { useEffect, useState } from 'react';

import { Without } from '@/lib/api';
import { useApiQuery } from '@/hooks/api/useApiQuery';

import { FiltersProps } from '@/components/commons/Filters/Filters';
import { useForm } from '@/components/commons/Form/useForm';
import { ListObjectType } from '@/components/commons/List/@types/List';

import { ticketsTableHeaders } from './CustomerTicketsModel';
import { customerTicketFilters as initialValues } from './CustomerTicketsModel';

export const useMyTicketsTable = (id: string) => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [activeTicket, setActiveTicket] = useState<any | null>();
  const filters: Without<FiltersProps, 'children'> = {
    form: useForm({
      initialValues,
      onSubmit: () => {
        null;
      },
    }),
  };

  const { data, refetch, ...apiQuery } = useApiQuery({
    route: 'CUSTOMER_TICKETS',
    values: { ...filters.form.values, page: Number(router.query?.page) || 1 },
    params: { id },
  });

  const tickets = data?.items || [];
  const pagination = data?.pagination || null;

  const table: ListObjectType = {
    ...ticketsTableHeaders,
    cardType: 'primary',
    form: filters.form,
    records: tickets.reduce(
      (prev: any[], current: any) => [
        ...prev,
        {
          id: current.id,
          cardData: {
            title: current.name,
          },
          data: {
            name: {
              value: current.name,
              hideOnMobile: true,
            },
            card: {
              value: current.card.name,
            },
            user: {
              value: `${current.user.profile.first_name} ${current.user.profile.last_name}`,
            },
            price: {
              value: current.price,
            },
            start_date: {
              value: current.start_date,
            },
            end_date: {
              value: current.end_date,
            },
            status: {
              value: current.status,
            },
            button: {
              value: current.name,
            },
          },
          actions: [
            {
              key: current.status === 'active' ? 'block' : 'unblock',
              expired: current.expired,
              handleClick: () => setActiveTicket(current),
            },
          ],
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
    activeTicket,
    filters,
    table,
    pagination,
    refetch,
    setActiveTicket,
    t,
    ...apiQuery,
  };
};
