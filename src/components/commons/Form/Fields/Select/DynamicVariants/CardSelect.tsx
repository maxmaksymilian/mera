import { useRouter } from 'next/router';

import { Without } from '@/lib/api';
import { useApiQuery } from '@/hooks/api/useApiQuery';

import {
  Select,
  SelectProps,
} from '@/components/commons/Form/Fields/Select/Select';
import { Skeleton } from '@/components/commons/Skeleton/Skeleton';

export const CardSelect = ({
  type,
  access = 'client',
  ...props
}: { type?: string; access?: 'client' | 'admin' } & Without<
  SelectProps,
  'options'
>) => {
  const { query } = useRouter();
  const { data, status } = useApiQuery({
    route: access === 'admin' ? 'POK_CUSTOMER_CARDS_LIST' : 'CARDS_LIST',
    values: { type: type || '' },
    params: {
      id: typeof query.id === 'string' ? query.id : '',
    },
  });
  return status === 'success' && data ? (
    <Select
      {...{
        ...props,
        dynamic: true,
        options: [
          ...data.map((card: any) => ({
            name: card.name,
            value: card.id,
          })),
        ],
      }}
    />
  ) : (
    <Skeleton height={48} width={200} />
  );
};
