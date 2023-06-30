import { useEffect, useState } from 'react';

import { useAppStore } from '@/lib';

import { useApiQuery } from './api/useApiQuery';

export type TicketType = {
  id: string;
  name: string;
  amount: number;
  price: number;
  validity: number;
  desc: string;
  ticketType?: string;
};

export const useEventsCart = ({ id }: { id: string }) => {
  const { token } = useAppStore();
  const [ticketsCart, setTicketsCart] = useState<TicketType[] | null>();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const { data, isLoading } = useApiQuery({ route: 'EVENTS', id });

  useEffect(() => {
    const tempTickets = data?.tickets?.map((ticket: any) => {
      return { ...ticket, amount: 0 };
    });

    setTicketsCart(tempTickets);
  }, [data]);

  useEffect(() => {
    const tempPrice = ticketsCart?.reduce(
      (prev, curr) => prev + curr.price * (curr.amount || 0),
      0
    );
    setTotalPrice(tempPrice || 0);
  }, [ticketsCart]);

  const toggleTicketAmount = (id: string, actionType: 'dec' | 'inc') => {
    const mappedTickets = ticketsCart?.map((item) => {
      if (item.id === id) {
        if (actionType === 'dec') {
          item.amount === 0 ? (item.amount = 0) : item.amount--;
        } else item.amount++;
      }
      return item;
    });

    setTicketsCart(mappedTickets);
  };

  const removeTicket = (id: string) => {
    const tempCart = ticketsCart?.map((ticket) => {
      if (ticket.id === id) {
        ticket.amount = 0;
      }
      return ticket;
    });
    setTicketsCart(tempCart);
  };

  return {
    isLoading,
    data,
    token,
    ticketsCart,
    totalPrice,
    toggleTicketAmount,
    removeTicket,
  };
};
