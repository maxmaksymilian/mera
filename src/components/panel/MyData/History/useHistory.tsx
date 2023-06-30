import { useApiQuery } from '@/hooks/api/useApiQuery';

export const useHistory = () => {
  const { data, status, isLoading } = useApiQuery({
    route: 'PROFILE_MY_DATA_HISTORY',
  });

  return { data, status, isLoading };
};
