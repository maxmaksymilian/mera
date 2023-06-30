import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import { clsxm } from '@/lib';

import { Button } from '@/components/commons/Button';
import { Link } from '@/components/commons/Link';
import { Modal } from '@/components/commons/Modal/Modal';

import { UserCardModal } from './UserCardModal';

export type MyUserCardProps = {
  id?: string;
  status?: boolean;
  isMobileCard?: boolean;
  first_name: string;
  last_name: string;
  pesel: string;
  email: string;
  telephone: {
    telephone: string;
    prefix: string;
  };
  isStepThree?: boolean;
  birthday_date?: string;
  handleReload?: () => void;
};

export const MyUserCard = ({
  id,
  first_name,
  last_name,
  pesel,
  email,
  telephone,
  isStepThree = false,
  isMobileCard = false,
  birthday_date,
  handleReload,
}: MyUserCardProps) => {
  const { t } = useTranslation('common');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className='ml-0 mb-4 w-full max-w-screen-sm px-0 py-4 pb-0 md:ml-[100px] md:py-9 md:px-11'>
      <p className='mb-7 hidden text-sm font-bold md:block md:text-2xl'>
        {first_name} {last_name}
      </p>
      <div className='flex justify-between'>
        <div className='mr-5 grid min-w-[120px] gap-y-4 text-sm text-gray md:mr-14 md:text-base md:text-black'>
          <p>Status</p>
          <p>{t('name')}</p>
          <p>{t('surname')}</p>
          {birthday_date ? <p>{t('birthday_date')}</p> : null}
          {pesel && <p className='inline-flex'>{t('pesel')}</p>}
          {email ? <p className='inline-flex'>{t('email')}</p> : null}
          {telephone.telephone ? (
            <p
              className={clsxm(
                'inline-flex',
                email?.length > 15 && 'mt-3 md:mt-0'
              )}
            >
              {t('phone')}
            </p>
          ) : null}
        </div>
        <div className='grid gap-y-4 text-sm md:text-base'>
          <p className='flex text-sm'>
            <span
              className={clsxm('mt-1 mr-2 h-3 w-3 rounded-3xl', 'bg-success')}
            />
            {t('active')}
          </p>
          <p>{first_name || ' '}</p>
          <p>{last_name || ' '}</p>
          {birthday_date ? <p>{birthday_date || ' '}</p> : null}
          {pesel && <p>{pesel || ' '}</p>}
          {email ? (
            <p
              className={clsxm(
                'max-w-[120px] break-words md:max-w-full',
                email.length > 15 && '-mb-3 md:mb-0'
              )}
            >
              {email || ' '}
            </p>
          ) : null}
          {telephone.telephone ? (
            <p>{telephone.prefix + ' ' + telephone.telephone || ' '}</p>
          ) : null}
        </div>
      </div>
      {isMobileCard && (
        <Link
          className='mt-3 block text-sm md:hidden'
          href={`/panel/moi-uzytkownicy/${id}`}
        >
          <Button fullWidth variant='secondary'>
            {t('buttonDetails')}
          </Button>
        </Link>
      )}
      {!isStepThree && (
        <button onClick={() => setIsOpen((prev) => !prev)}>
          <p className='mt-9 text-sm text-navy md:text-base'>
            {t('makeStandaloneAcc')}
          </p>
        </button>
      )}
      {id && (
        <Modal handleClose={() => setIsOpen((prev) => !prev)} isOpen={isOpen}>
          <UserCardModal
            id={id}
            name={`${first_name} ${last_name}`}
            handleClose={() => setIsOpen((prev) => !prev)}
            handleReload={handleReload}
          />
        </Modal>
      )}
    </div>
  );
};
