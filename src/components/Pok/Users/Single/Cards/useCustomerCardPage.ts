import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { useEffect, useState } from 'react';

import { Without } from '@/lib/api';
import { getCardTypeName } from '@/lib/helpers';
import { useApiQuery } from '@/hooks/api/useApiQuery';

import { FiltersProps } from '@/components/commons/Filters/Filters';
import { useForm } from '@/components/commons/Form/useForm';
import { ListObjectType } from '@/components/commons/List/@types/List';

import { CustomerCardsPageProps } from './CustomerCardsPage';
import {
  customerCardsPageFilters as initialValues,
  customerCardsPageHeaders,
} from './CustomerCardsPageModel';

export const useCustomerCardPage = ({
  id,
  openModal,
}: CustomerCardsPageProps) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [activeCard, setActiveCard] = useState<any | null>();
  const [isOpen, setIsOpen] = useState<boolean>(openModal);
  const filters: Without<FiltersProps, 'children'> = {
    form: useForm({
      initialValues,
      onSubmit: () => {
        null;
      },
    }),
  };

  const { data, status, isLoading, refetch, isRefetching } = useApiQuery({
    route: 'POK_CUSTOMER_CARDS',
    values: { ...filters.form.values, page: Number(router.query?.page) || '1' },
    params: {
      id,
    },
  });

  const cards = data?.items || [];
  const pagination = data?.pagination || null;

  const handleRefresh = () => {
    refetch();
  };

  const table: ListObjectType = {
    ...customerCardsPageHeaders,
    cardType: 'secondary',
    form: filters.form,
    records: cards.reduce(
      (prev: any[], current: any) => [
        ...prev,
        {
          id: current.id,
          cardData: {
            number: current.number,
            title: current.title,
            description: current.description,
            link: `/pok/karty/${current.id}`,
            linkButton: {
              link: `/pok/karty/${current.id}`,
              content: 'viewDetails',
            },
          },
          data: {
            name: {
              value: current.name,
              properties: {
                link: `/pok/karty/${current.id}`,
              },
              hideOnMobile: true,
            },
            card: {
              value: getCardTypeName(current.type),
            },
            number: {
              value: current.number,
              properties: {
                title: current.title,
              },
              hideOnMobile: true,
            },
            expiration_date: {
              value: current.expiration_date,
            },
            active_tickets: {
              value: current.tickets,
            },
            status: {
              value: current.status,
            },
          },
          actions: [
            {
              key: current.status === 'active' ? 'block' : 'unblock',
              handleClick: () => {
                setActiveCard(current);
              },
            },
          ],
        },
      ],
      []
    ),
  };

  useEffect(() => {
    handleRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query?.page, filters.form.values]);

  return {
    activeCard,
    isLoading,
    isRefetching,
    isOpen,
    filters,
    table,
    status,
    pagination,
    handleRefresh,
    setIsOpen,
    setActiveCard,
    refetch,
    t,
  };
};
