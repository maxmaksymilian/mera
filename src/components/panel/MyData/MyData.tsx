import { useApiQuery } from '@/hooks/api/useApiQuery';

import { MyDataPageContent } from './MyDataPageContent';

export const MyData = () => {
  const { data, status, refetch } = useApiQuery({ route: 'PROFILE_MY_DATA' });

  return (
    <>
      {status === 'success' && <MyDataPageContent {...{ ...data, refetch }} />}
    </>
  );
};
