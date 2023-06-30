import { FormikContextType, FormikValues, useFormikContext } from 'formik';
import { useEffect, useState } from 'react';

import { convertDate } from '@/lib/helpers';
import { useApiQuery, UseApiQueryProps } from '@/hooks/api/useApiQuery';

import { TicketType } from '@/components/commons/Cards/OrderTicketCard';

export const useTickets = (props: UseApiQueryProps) => {
  const { values, setFieldValue }: FormikContextType<FormikValues> =
    useFormikContext();
  const { data, ...apiQuery } = useApiQuery(props);
  const [search, setSearch] = useState<string>('');
  const [tickets, setTickets] = useState<TicketType[]>([]);

  const toggleTicket = (action: 'add' | 'remove', id: string) => {
    if (action === 'remove') {
      const ticketsToRemove = values.item.filter(
        (ticket: TicketType) => ticket.id === id
      );

      setFieldValue('item', [
        ...values.item.filter((ticket: TicketType) => ticket.id !== id),
        ...ticketsToRemove.filter(
          (_ticket: TicketType, index: number) =>
            index !== ticketsToRemove.length - 1
        ),
      ]);
    } else {
      const ticketToAdd = data?.tickets?.items
        ? data?.tickets?.items?.find((item: TicketType) => item.id === id)
        : {};
      setFieldValue('item', [
        ...values.item,
        { ...ticketToAdd, activation_date: convertDate('', true) },
      ]);
    }
  };

  const countTicket = (id: string) =>
    values.item.filter((ticket: TicketType) => ticket.id === id).length;

  useEffect(() => {
    if (search === '' && data?.tickets?.items) {
      return setTickets(data?.tickets?.items);
    }

    const filteredTickets = data?.tickets?.items
      ? data?.tickets?.items?.filter(({ name }: TicketType) =>
          name.includes(search)
        )
      : [];
    return setTickets(filteredTickets);
  }, [data, search]);

  return { search, setSearch, tickets, toggleTicket, countTicket, ...apiQuery };
};
