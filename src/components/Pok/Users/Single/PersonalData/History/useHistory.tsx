import { useApiQuery } from '@/hooks/api/useApiQuery';

import { HistoryProps } from './History';

export const useHistory = ({ id }: HistoryProps) => {
  const { data, status, isLoading } = useApiQuery({
    route: 'POK_CUSTOMER_HISTORY_CHANGES',
    params: { id },
  });

  return { data, status, isLoading };
};
