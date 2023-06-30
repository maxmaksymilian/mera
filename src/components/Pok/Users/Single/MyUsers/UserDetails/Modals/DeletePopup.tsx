import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import { useAppStore } from '@/lib';
import { useApiMutation } from '@/hooks/api/useApiMutation';

import { Button } from '@/components/commons/Button';
import { Container } from '@/components/commons/Container';
import { Spinner } from '@/components/commons/Spinner';

type DeletePopupType = {
  first_name: string;
  last_name: string;
  id: string;
  userid: string;
  handleClose: () => void;
};

export const DeletePopup = ({
  first_name,
  last_name,
  id,
  userid,
  handleClose,
}: DeletePopupType) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { token } = useAppStore();
  const { mutate } = useApiMutation({
    route: 'POK_PROFILE_MY_USERS',
    method: 'DELETE',
    params: { id },
    id: userid,
  });
  const [isLoading, setLoading] = useState<boolean>(false);

  const submitDelete = () => {
    setLoading(true);
    mutate(
      { token, id },
      {
        onSuccess: ({ error }) => {
          if (error) {
            setLoading(false);
          }
          router.push(`/pok/baza-klientow/${id}/uzytkownicy`);
          setLoading(false);
        },
      }
    );
  };

  return (
    <Container>
      <h1 className='mr-16 mt-8 pr-5 text-2xl font-normal md:mx-9 md:mr-0 md:pr-24 md:text-lg'>
        {t('deleteAccInfo')}?
      </h1>
      <p className='mt-4 text-sm text-gray md:mx-10 md:text-base'>
        {t('deleteAccInfo')} {first_name} {last_name}?
      </p>
      <div className='mt-16 mb-16 flex flex-col justify-center text-sm md:flex-row md:text-base'>
        <Button
          variant='secondary'
          className='text-base'
          handleClick={() => handleClose()}
        >
          {t('cancel')}
        </Button>
        <Button
          className='mt-4 text-base md:ml-5 md:mt-0 md:px-12'
          handleClick={() => submitDelete()}
        >
          {isLoading ? <Spinner /> : t('delete')}
        </Button>
      </div>
    </Container>
  );
};
