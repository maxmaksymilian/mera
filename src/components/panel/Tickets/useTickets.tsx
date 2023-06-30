import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Without } from '@/lib/api';
import { useApiQuery } from '@/hooks/api/useApiQuery';

import { FiltersProps } from '@/components/commons/Filters/Filters';
import { useForm } from '@/components/commons/Form/useForm';
import { ListObjectType } from '@/components/commons/List/@types/List';

import { ticketsTableHeaders } from './TicketsModel';
import { ticketsFilters as initialValues } from './TicketsModel';

export const useMyTicketsTable = () => {
  const router = useRouter();
  const [returnTicket, setReturnTicket] = useState<any | null>();
  const [ticketName, setName] = useState<any | null>();
  const [ticketId, setTicketId] = useState<any | null>();
  const [cardId, setCardId] = useState<any | null>();
  const filters: Without<FiltersProps, 'children'> = {
    form: useForm({
      initialValues,
      onSubmit: () => {
        null;
      },
    }),
  };

  const { data, refetch, ...query } = useApiQuery({
    route: 'PROFILE_MY_TICKETS',
    values: {
      ...filters.form.values,
      page: typeof router.query?.page === 'string' ? router.query.page : '1',
    },
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
              key: current.status === 'active' ? 'return' : 'returnInProgress',
              expired: current.expired,
              handleClick: () => {
                setReturnTicket(current);
                setName(current.name);
                setTicketId(current.id);
                setCardId(current.card.id);
              },
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
  }, [filters.form.values, router.query.page]);

  return {
    tickets,
    returnTicket,
    refetch,
    setReturnTicket,
    ticketName,
    ticketId,
    cardId,
    table,
    filters,
    pagination,
    ...query,
  };
};
