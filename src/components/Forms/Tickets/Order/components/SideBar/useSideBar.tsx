import { FormikContextType, FormikValues, useFormikContext } from 'formik';
import { useEffect, useState } from 'react';

import { TicketType } from '@/components/commons/Cards/OrderTicketCard';

export const useSideBar = () => {
  const { values, setFieldValue }: FormikContextType<FormikValues> =
    useFormikContext();
  const [tickets, setTickets] = useState<TicketType[]>([]);

  const removeTicket = (id: string) => {
    setFieldValue('item', [
      ...values.item.filter((ticket: TicketType) => ticket.id !== id),
    ]);
  };

  const countTicket = (id: string) =>
    values.item.filter((ticket: TicketType) => ticket.id === id).length;

  const summaryPrice = values.item.reduce(
    (prev: number, current: TicketType) => (prev += current.price),
    0
  );

  useEffect(
    () =>
      setTickets([
        ...new Map<string, TicketType>(
          values.item.map((item: TicketType) => [item.id, item])
        ).values(),
      ]),
    [values]
  );

  return { values, summaryPrice, tickets, countTicket, removeTicket };
};
