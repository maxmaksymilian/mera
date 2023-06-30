import { useApiQuery } from '@/hooks/api/useApiQuery';

import { SelectedUserTicketsProps } from './SelectedUserTickets';

export const useSelectedUserTickets = ({ id }: SelectedUserTicketsProps) => {
  const { data: user, isFetched } = useApiQuery({
    route: 'POK_USERS_PROFILE_DATA',
    params: { id },
  });

  return { user, isFetched };
};
