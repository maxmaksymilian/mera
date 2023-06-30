import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import { useAppStore } from '@/lib';
import { useApiMutation } from '@/hooks/api/useApiMutation';

import { Button } from '@/components/commons/Button';
import { Container } from '@/components/commons/Container';
import { Input } from '@/components/commons/Fields';
import { Spinner } from '@/components/commons/Spinner';

type ConvertPopupType = {
  first_name: string;
  last_name: string;
  id: string;
  userid: string;
  handleClose: () => void;
};

export const ConvertPopup = ({
  first_name,
  last_name,
  id,
  userid,
  handleClose,
}: ConvertPopupType) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { token } = useAppStore();
  const { mutate } = useApiMutation({
    route: 'POK_PROFILE_MY_USERS_TRANSFORM',
    method: 'POST',
    params: { id, userid },
  });
  const [isLoading, setLoading] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      setLoading(true);
      mutate(
        { token, id, ...values },
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
    },
  });

  return (
    <Container>
      <h1 className='ml-0 mr-16 mt-0 text-2xl md:mx-9 md:mt-8 md:text-lg'>
        {t('makeStandaloneAcc')}
      </h1>
      <p className='mr-0 ml-0 mt-4 text-sm text-gray md:mr-32 md:ml-10 md:text-base'>
        {t('makeStandaloneAccInfo')}
      </p>
      <form onSubmit={formik.handleSubmit}>
        <p className='mt-5 text-base font-bold md:mx-9 md:mt-10 md:text-2xl'>
          {first_name} {last_name}
        </p>
        <p className='mt-2 text-sm md:mx-9 md:mt-5 md:text-base'>
          {t('email')}
        </p>
        <div className='text-sm md:mr-28 md:ml-9 md:text-base'>
          <Input
            name='email'
            type='email'
            value={formik.values.email}
            error={formik.errors.email}
            placeholder={t('email')}
            handleChange={(e) => formik.handleChange(e)}
            handleBlur={(e) => formik.handleBlur(e)}
          />
        </div>
        <div className='mt-16 mb-16 block justify-center text-center md:flex md:text-left'>
          <Button
            variant='secondary'
            type='button'
            className='w-full px-0 text-base md:w-fit md:px-6'
            handleClick={() => handleClose()}
          >
            {t('cancel')}
          </Button>
          <Button
            className='ml-0 mt-4 px-12 text-base md:mt-0 md:ml-5'
            type='submit'
          >
            {isLoading ? <Spinner /> : t('buttonSendConfirmation')}
          </Button>
        </div>
      </form>
    </Container>
  );
};
