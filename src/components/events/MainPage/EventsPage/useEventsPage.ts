import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { useEffect, useState } from 'react';

import { useApiQuery } from '@/hooks/api/useApiQuery';

export const useEventsPage = () => {
  const router = useRouter();
  const { t } = useTranslation('events');
  const [filters, setFilter] = useState<{
    category: string;
    search: string;
  }>({ category: '', search: '' });

  const {
    data: events,
    status,
    refetch,
  } = useApiQuery({
    route: 'EVENTS',
    values: {
      ...filters,
      page: typeof router.query?.page === 'string' ? router.query.page : '1',
    },
  });

  const { data: categories, status: categoryStatus } = useApiQuery({
    route: 'EVENTS_CATEGORIES',
  });

  const pagination = events?.pagination;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, router.query?.page]);

  return {
    filters,
    categories,
    categoryStatus,
    events,
    isModalOpen,
    status,
    pagination,
    t,
    setFilter,
    setIsModalOpen,
  };
};
