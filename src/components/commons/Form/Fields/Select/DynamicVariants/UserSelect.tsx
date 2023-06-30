import { useRouter } from 'next/router';

import { Without } from '@/lib/api';
import { useApiQuery } from '@/hooks/api/useApiQuery';

import {
  Select,
  SelectProps,
} from '@/components/commons/Form/Fields/Select/Select';
import { Skeleton } from '@/components/commons/Skeleton/Skeleton';

export const UserSelect = ({
  type,
  access = 'client',
  ...props
}: { type?: string; access?: 'client' | 'admin' } & Without<
  SelectProps,
  'options'
>) => {
  const { query } = useRouter();
  const { data, status } = useApiQuery({
    route: access === 'admin' ? 'POK_CUSTOMER_ALL_USERS' : 'PROFILE_ALL_USERS',
    values: { type: type || '' },
    params: { id: typeof query.id === 'string' ? query.id : '' },
  });

  return (
    <>
      {status === 'success' ? (
        <Select
          {...{
            ...props,
            dynamic: true,
            options: [
              ...data.map((user: any) => ({
                name: `${user.first_name} ${user.last_name}`,
                value: user.id,
              })),
            ],
          }}
        />
      ) : (
        <Skeleton height={48} width={200} />
      )}
    </>
  );
};
