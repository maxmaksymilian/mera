import { useRouter } from 'next/router';

import { Without } from '@/lib/api';
import { useApiQuery } from '@/hooks/api/useApiQuery';

import {
  Select,
  SelectProps,
} from '@/components/commons/Form/Fields/Select/Select';
import { Skeleton } from '@/components/commons/Skeleton/Skeleton';

export const RoleSelect = ({
  type,
  ...props
}: { type?: string } & Without<SelectProps, 'options'>) => {
  const { query } = useRouter();
  const { data, status } = useApiQuery({
    route: 'POK_ROLES',
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
          ...data.map((role: any) => ({
            name: role.name,
            value: role.name,
          })),
        ],
      }}
    />
  ) : (
    <Skeleton height={48} width={200} />
  );
};
