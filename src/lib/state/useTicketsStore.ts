import { create } from 'zustand';

type TicketType = {
  amount: number;
  id: string;
  name: string;
  price: number;
};

type EventType = {
  name: string;
  date: string;
  image?: string;
};

type StoreState = {
  boughtTickets: TicketType[];
  event: EventType | null;
  addEvent: (event: EventType) => void;
  addTickets: (tickets: TicketType[]) => void;
  removeAllTickets: () => void;
};

export const useTicketsStore = create<StoreState>((set) => ({
  boughtTickets: [],
  event: null,
  addEvent: (event) => set((state) => ({ ...state, event })),
  removeEvent: () => set((state) => ({ ...state, event: null })),
  addTickets: (tickets) =>
    set((state) => ({ ...state, boughtTickets: tickets })),
  removeAllTickets: () => set((state) => ({ ...state, boughtTickets: [] })),
}));
