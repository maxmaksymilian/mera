import { useRouter } from 'next/router';

import { TransformForm } from '@/components/Forms/Auth/Transform/TransformForm';

export type TransformFormType = {
  token: string;
};

export const Transform = ({ token }: TransformFormType) => {
  const router = useRouter();

  return (
    <div className='flex flex-col gap-12'>
      <TransformForm
        {...{
          token,
          route: 'AUTH_TRANSFORM',
          method: 'POST',
          handleSubmit: () => router.push('/auth/logowanie'),
        }}
      />
    </div>
  );
};
