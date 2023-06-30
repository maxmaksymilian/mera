import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import { clsxm, useAppStore } from '@/lib';
import { getCardTypeName, maskCardNumber } from '@/lib/helpers';
import { useApiMutation } from '@/hooks/api/useApiMutation';
import { useScreen } from '@/hooks/useScreen';

import { Button } from '@/components/commons/Button';
import { Link } from '@/components/commons/Link';
import { Modal } from '@/components/commons/Modal/Modal';
import { Status } from '@/components/commons/Status';
import { CardType } from '@/components/panel/MyCards/MyCardsModel';

export const Card = ({
  id,
  user,
  name,
  status,
  type,
  expiration_date,
  isDetails,
  number,
  tickets,
  isRemovable,
  handleClick,
  handleReload,
}: {
  variant?: boolean;
  handleClick?: () => void;
  handleReload: () => void;
} & CardType) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isMdUp } = useScreen();
  const { token } = useAppStore();
  const { t } = useTranslation('common');
  const { mutate } = useApiMutation({
    route: 'PROFILE_MY_CARDS',
    method: 'DELETE',
  });

  const headers: { [key: string]: string | number } = {
    ['Rodzaj nośnika']: getCardTypeName(type),
    ['Właściciel']: `${
      user?.profile
        ? user?.profile?.first_name + ' ' + user?.profile?.last_name
        : 'brak'
    }`,
    ['Numer karty']: maskCardNumber(number || '0'),
    ['Termin ważności']: expiration_date,
    ['Aktywne bilety']: tickets,
  };

  const removeCard = () => {
    mutate(
      { token, id },
      {
        onSuccess: ({ error }) => {
          if (error) {
            return;
          }
          return handleReload();
        },
      }
    );
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div
        className={clsxm(
          'card-wrapper',
          'min-h-sm border-b border-cloud',
          'sm:border sm:px-2.5 md:border',
          'flex flex-col justify-between ',
          isDetails && 'border-none sm:px-0 md:w-100'
        )}
      >
        <Link href={`/panel/moje-karty/${id}`}>
          <div
            className={clsxm(
              'py-7 md:py-10 md:px-8',
              isDetails && 'md:py-0 md:px-0'
            )}
          >
            <div className='card-content cursor-pointer'>
              <div
                className={clsxm(
                  'card-headline flex items-center justify-between pb-8',
                  isDetails && 'border-b border-cloud pb-6'
                )}
              >
                {isDetails ? (
                  <>
                    <h2 className='text-base font-bold leading-6 text-black md:text-md md:leading-8'>
                      {t('cardDataLabel')}
                    </h2>
                    {tickets === 0 ? (
                      <Button
                        variant='quaternary'
                        handleClick={handleClick}
                        className='hidden h-auto px-0 md:block'
                      >
                        {t('buttonEdit')}
                      </Button>
                    ) : null}
                  </>
                ) : (
                  <>
                    <p className='text-base leading-6 md:font-bold'>{name}</p>
                    <Status value={status} className='hidden md:block' />
                  </>
                )}
              </div>
              <div className={clsxm(isDetails && 'pt-7')}>
                {Object.keys(headers).map((header, index) => {
                  return (
                    <>
                      {headers[header] ? (
                        <div
                          key={index}
                          className='flex gap-2.5 pb-2.5 md:pb-3.5'
                        >
                          <p className='w-1/2 text-sm leading-6 text-gray md:text-base md:leading-8'>
                            {header}
                          </p>
                          <p className='w-1/2 text-sm leading-6 md:text-base md:leading-8'>
                            {headers[header]}
                          </p>
                        </div>
                      ) : null}
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </Link>
        <div
          className={clsxm(
            'card-buttons flex justify-center gap-2.5 pb-10 sm:flex-col md:flex-row md:border-cloud md:pb-0',
            isRemovable && tickets === 0 && 'md:border-t'
          )}
        >
          <Button
            variant='secondary'
            className='h-12 w-full md:hidden md:w-1/2'
          >
            <Link href={`/panel/moje-karty/${id}`}>{t('buttonDetails')}</Link>
          </Button>
          {isRemovable && tickets === 0 ? (
            <Button
              variant={isMdUp ? 'quaternary' : 'secondary'}
              handleClick={() => setIsOpen(true)}
              className='h-12 w-full md:h-14 md:w-1/2'
            >
              {t('buttonRemoveCard')}
            </Button>
          ) : null}
        </div>
      </div>
      <Modal {...{ isOpen, handleClose }}>
        <div className='flex min-h-full w-full max-w-6xl flex-col items-center justify-center gap-20 px-10 pt-10 pb-20 lg:w-md lg:items-start lg:justify-start'>
          <div className='flex flex-col gap-5'>
            <h2 className='text-md md:text-lg'>
              {t('removeCardModalHeadline')}
            </h2>
            <p className='text-base'>
              {t('removeCardModalSubheadline', {
                number: number,
                user: user?.profile
                  ? user.profile.first_name + ' ' + user.profile.last_name
                  : 'brak',
              })}
            </p>
          </div>
          <div className='flex justify-center gap-2.5 md:mx-auto'>
            <Button handleClick={handleClose} variant='secondary'>
              {t('cancel')}
            </Button>
            <Button handleClick={removeCard}>{t('buttonRemoveCard')}</Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
