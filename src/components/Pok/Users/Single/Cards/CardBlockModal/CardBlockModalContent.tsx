import { clsxm } from '@/lib';

import { Button } from '@/components/commons/Button';
import { SubmitButton } from '@/components/commons/Form/Fields/SubmitButton';

import { useCardBlockModalContent } from './useCardBlockModalContent';

export type CardBlockModalContentProps = {
  id: string;
  userId: string;
  status: string;
  handleClose: () => void;
  handleRefresh: () => void;
};

export const CardBlockModalContent = ({
  id,
  userId,
  status,
  handleClose,
  handleRefresh,
}: CardBlockModalContentProps) => {
  const { isLoading, mutate, t } = useCardBlockModalContent({ id, userId });
  return (
    <div className='min-h-sm w-full px-9 py-10 md:w-md md:px-11 lg:w-md'>
      <h1
        className={clsxm(
          'pb-7 text-md font-normal leading-8 text-black',
          'md:pb-32 md:text-lg md:leading-lg'
        )}
      >
        {status === 'active'
          ? t('pok.customerData.cards.cardBlockModalHeadline')
          : t('pok.customerData.cards.cardUnblockModalHeadline')}
      </h1>
      <div className='flex items-center justify-center gap-2.5'>
        <Button variant='secondary' handleClick={handleClose}>
          {t('cancel')}
        </Button>
        <SubmitButton
          label={status === 'active' ? 'block' : 'unblock'}
          loading={isLoading}
          handleClick={() =>
            mutate(
              { id },
              {
                onSuccess: () => {
                  handleClose();
                  handleRefresh();
                },
              }
            )
          }
        />
      </div>
    </div>
  );
};
