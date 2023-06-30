import useTranslation from 'next-translate/useTranslation';

import { useApiQuery } from '@/hooks/api/useApiQuery';

type Case = {
  id: string;
  number: string;
  status: string;
  title: string;
};

export const useCasesList = () => {
  const { t } = useTranslation('common');
  const { data, status, refetch, ...query } = useApiQuery({
    route: 'PROFILE_DASHBOARD',
  });

  const cases: Case[] = data?.cases;

  return { cases, status, t };
};
