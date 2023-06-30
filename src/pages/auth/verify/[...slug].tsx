import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useApiMutation } from '@/hooks/api/useApiMutation';

import { Spinner } from '@/components/commons/Spinner';

import { useAuthContext } from '@/providers/AuthProvider';

const MyUsersPage = ({
  query,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { push, pathname } = useRouter();
  const { isClient } = useAuthContext();

  const { mutate } = useApiMutation({
    route: 'AUTH_VERIFY_EMAIL',
    method: 'POST',
    params: {
      id: query.slug[0],
      token: query.slug[1],
      second_token: query.slug[2],
      signature: query.signature,
    },
  });

  useEffect(() => {
    mutate(
      {},
      {
        onSuccess: ({ error }) => {
          if (!error) {
            push(isClient ? '/panel' : '/pok');
          } else {
            push(
              !pathname.includes('pok')
                ? '/auth/logowanie'
                : '/pok/auth/logowanie'
            );
          }
        },
      }
    );
  }, []);

  return (
    <div className='z-50 flex h-screen w-full items-center justify-center bg-white'>
      <Spinner className='border-navy border-t-transparent' />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;

  return {
    props: {
      query,
    },
  };
};

export default MyUsersPage;
