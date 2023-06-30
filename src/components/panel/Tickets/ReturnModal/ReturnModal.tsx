import Link from 'next/link';
import { useRouter } from 'next/router';

import { clsxm } from '@/lib';

import { Button } from '@/components/commons/Button';
import { SubmitButton } from '@/components/commons/Form/Fields/SubmitButton';

import { useReturnModal } from './useReturnModal';

export type ReturnModalProps = {
  status: string;
  id: string;
  ticketName: string;
  ticketId: string;
  cardId: string;
  handleClose: () => void;
  handleRefresh: () => void;
};

export const ReturnModal = ({
  id,
  ticketName,
  ticketId,
  cardId,
  handleClose,
}: ReturnModalProps) => {
  const { isLoading, t } = useReturnModal({ id });
  const router = useRouter();
  return (
    <div className='min-h-sm w-full px-9 py-10 md:w-md md:px-11 lg:w-md'>
      <h1
        className={clsxm(
          'pb-7 text-md font-normal leading-8 text-black',
          'md:text-lg md:leading-lg'
        )}
      >
        Czy napewno chcesz zwrócić bilet?
      </h1>
      <p className='text-gray md:pb-32'>
        Sprawdź czy chcesz napewno zwrócić bilet. Szczegóły opisujące procedurę
        biletu znajdują się w{' '}
        <Link href='/panel'>
          <em className='cursor-pointer text-navy'>regulaminie serwisu.</em>
        </Link>{' '}
        Klikająć przycisk „rozpocznij zwrot zostaniesz przekierowany do
        formularza zgłoszeniowego”
      </p>
      <div className='flex items-center justify-center gap-2.5'>
        <Button variant='secondary' handleClick={handleClose}>
          {t('cancel')}
        </Button>
        <SubmitButton
          label={t('startReturn')}
          loading={isLoading}
          handleClick={() => {
            router.push(
              {
                pathname: '/panel/sprawy',
                query: {
                  ticketReturn: true,
                  name: `${ticketName}`,
                  ticket: `${ticketId}`,
                  card: `${cardId}`,
                },
              },
              'sprawy?refund'
            );
          }}
        />
      </div>
    </div>
  );
};
