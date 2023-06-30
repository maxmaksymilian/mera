import { CodeUpdatePasswordForm } from '@/components/Forms/Auth/CodeUpdatePassword/CodeUpdatePasswordForm';
import { UpdatePasswordForm } from '@/components/Forms/Auth/UpdatePassword/UpdatePasswordForm';
import { Layout } from '@/components/Layouts/Auth/Layout';

import { useUpdatePassword } from './useUpdatePassword';

export type UpdatePasswordFormType = {
  token: string;
  email: string;
};

export const UpdatePassword = ({ ...props }: UpdatePasswordFormType) => {
  const { setCodeData, router, isCode, ...values } = useUpdatePassword(props);

  return (
    <Layout
      title='updatePassword.title'
      content={isCode ? 'updatePassword.contentCode' : 'updatePassword.content'}
    >
      <div className='flex flex-col gap-12'>
        {isCode ? (
          <CodeUpdatePasswordForm
            {...{
              ...props,
              ...values,
              route: 'AUTH_NEW_PASSWORD',
              method: 'POST',
              handleSubmit: () => router.push('/auth/logowanie'),
            }}
          />
        ) : (
          <UpdatePasswordForm
            {...{
              ...props,
              route: 'AUTH_VERIFY_PASSWORD',
              method: 'POST',
              handleSubmit: ({ values }) => setCodeData(values),
            }}
          />
        )}
      </div>
    </Layout>
  );
};
