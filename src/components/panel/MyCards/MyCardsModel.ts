export type CardType = {
  id: string;
  name: string;
  type: string;
  number: string;
  user: {
    id: string;
    profile: {
      first_name: string;
      last_name: string;
    };
  };
  expiration_date: string;
  status: string;
  tickets: number;
  isRemovable?: boolean;
  isDetails?: boolean;
};

export const cardsFilters = {
  search: '',
  type: '',
  user: '',
};
