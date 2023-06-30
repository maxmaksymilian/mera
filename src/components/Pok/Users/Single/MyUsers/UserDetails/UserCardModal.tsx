import { useFormik } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import { generateErrors } from '@/lib/helpers';
import { useApiMutation } from '@/hooks/api/useApiMutation';

import { Button } from '@/components/commons/Button';
import { Input } from '@/components/commons/Fields';
import { FormMessage } from '@/components/commons/FormMessage';
import { Spinner } from '@/components/commons/Spinner';

type UserCardModalType = {
  id: string;
  name: string;
  handleClose: () => void;
  handleReload?: () => void;
};

export const UserCardModal = ({
  id,
  name,
  handleClose,
  handleReload,
}: UserCardModalType) => {
  const { t } = useTranslation('common');
  const { mutate } = useApiMutation({
    route: 'PROFILE_MY_USERS_TRANSFORM',
    method: 'POST',
    params: { id },
  });
  const [isLoading, setLoading] = useState<boolean>(false);
  const [errorContent, setErrorContent] = useState<string[]>();
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      setLoading(true);
      setErrorContent([]);
      mutate(
        { ...values },
        {
          onSuccess: ({ error, errors }) => {
            if (error || errors) {
              setLoading(false);
              const newErrors = generateErrors({
                message: error,
                errors: errors || [],
              });
              return setErrorContent(newErrors);
            }
            setLoading(false);
            handleReload && handleReload();
            handleClose();
          },
        }
      );
    },
  });

  return (
    <div className='flex flex-col p-10 pb-20'>
      <h1 className='text-9 pb-5'>{t('makeStandaloneAcc')}</h1>
      <p className='pb-10 text-base text-gray'>{t('makeStandaloneAccInfo')}</p>
      {errorContent && errorContent.length > 0 && (
        <div className='pb-10'>
          <FormMessage success={false}>
            <>
              {errorContent.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </>
          </FormMessage>
        </div>
      )}
      <form onSubmit={formik.handleSubmit} className='flex flex-col gap-14'>
        <div className='flex flex-col gap-5'>
          <p className='text-md font-bold'>{name}</p>
          <Input
            type='text'
            name='email'
            value={formik.values.email}
            error={formik.errors.email}
            label={t('email')}
            placeholder={t('enterEmail')}
            handleBlur={formik.handleBlur}
            handleChange={formik.handleChange}
          />
        </div>
        <div className='flex justify-center gap-7'>
          <Button
            type='button'
            variant='secondary'
            rounded
            handleClick={handleClose}
          >
            {t('cancel')}
          </Button>
          <Button variant='primary' type='submit' rounded>
            {isLoading ? <Spinner /> : `${t('buttonSendConfirmation')}`}
          </Button>
        </div>
      </form>
    </div>
  );
};
