import { useRouter } from 'next/router';

import { NewPasswordForm } from '@/components/Forms/Auth/NewPassword/NewPasswordForm';

export type NewPasswordFormType = {
  token: string;
  email: string;
};

export const NewPassword = ({ ...props }: NewPasswordFormType) => {
  const router = useRouter();

  return (
    <div className='flex flex-col gap-12'>
      <NewPasswordForm
        {...{
          ...props,
          route: 'AUTH_RESET_PASSWORD',
          method: 'POST',
          handleSubmit: () => router.push('/pok/auth/logowanie'),
        }}
      />
    </div>
  );
};
