import { Without } from '@/lib/api';
import { useApiQuery } from '@/hooks/api/useApiQuery';

import { Layout, LayoutProps } from './Layout';

export const LayoutUsersDatabase = ({
  id,
  children,
  ...props
}: { id: string } & Without<LayoutProps, 'title' | 'dynamic'>) => {
  const { data, status, isLoading } = useApiQuery({
    route: 'POK_USERS_PROFILE_DATA',
    params: { id },
  });

  return (
    <Layout
      {...{
        ...props,
        title:
          status === 'success' && data
            ? `${data.profile.first_name} ${data.profile.last_name}`
            : '',
        breakpoints:
          status === 'success' && data && props.breakpoints
            ? [
                ...props.breakpoints,
                {
                  children: `${data.profile.first_name} ${data.profile.last_name}`,
                  dynamic: true,
                },
              ]
            : props.breakpoints
            ? [...props.breakpoints]
            : [],
        dynamic: { status, isLoading },
      }}
    >
      {children}
    </Layout>
  );
};
