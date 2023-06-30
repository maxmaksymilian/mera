import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import { Button } from '@/components/commons/Button';
import { Link } from '@/components/commons/Link';
import { Modal } from '@/components/commons/Modal/Modal';
import { RegisterForm } from '@/components/Forms/Auth/Register/RegisterForm';

type RegisterFormProps = {
  title: string;
  content: string;
};

export const Register = ({ title, content }: RegisterFormProps) => {
  const { t } = useTranslation('common');
  const [isModalOpen, toggleModal] = useState<boolean>(false);

  return (
    <div className='min-h-screen px-9 pt-20 pb-10 md:mt-0 md:p-28'>
      <div className='w-full items-stretch lg:flex'>
        <div className='w-full px-0 md:px-9 lg:flex lg:w-1/2 lg:items-center lg:justify-end lg:px-0'>
          <div className='w-full lg:max-w-[620px]'>
            <div className='mx-auto flex max-w-[620px] flex-col gap-12 pt-8 pb-5 lg:mx-0 lg:pt-0 lg:pb-0'>
              <div className='flex flex-col gap-8'>
                <h1 className='text-2xl font-normal md:text-lg'>{title}</h1>
                <p className='text-sm text-gray md:text-base'>{content}</p>
              </div>
            </div>
          </div>
        </div>
        <div className='relative hidden w-1/2 lg:block' />
      </div>
      <div>
        <RegisterForm
          {...{
            route: 'AUTH_REGISTER',
            method: 'POST',
            handleSubmit: () => toggleModal(true),
          }}
        />
        <Modal handleClose={() => toggleModal(false)} isOpen={isModalOpen}>
          <div className='flex min-h-full w-full max-w-6xl flex-col items-center justify-center gap-20 px-10 pt-10 pb-20 lg:w-md lg:items-start lg:justify-start'>
            <div className='flex flex-col gap-5'>
              <h2 className='text-lg'>{t('thankYouTitle')}</h2>
              <p className='text-base'>{t('thankYouDescription')}</p>
            </div>
            <Link href='/auth/logowanie' className='mx-auto'>
              <Button>{t('goToLoginPage')}</Button>
            </Link>
          </div>
        </Modal>
      </div>
    </div>
  );
};
