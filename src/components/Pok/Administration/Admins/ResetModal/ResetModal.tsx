import { clsxm } from '@/lib';

import { Button } from '@/components/commons/Button';
import { SubmitButton } from '@/components/commons/Form/Fields/SubmitButton';

import { useResetModal } from './useResetModal';

export type ResetModalProps = {
  email: string;
  id: string;
  handleClose: () => void;
};

export const ResetModal = ({ id, handleClose }: ResetModalProps) => {
  const { isLoading, t, mutate } = useResetModal({ id });

  return (
    <div className='min-h-sm w-full px-9 py-10 md:w-md md:px-11 lg:w-md'>
      <h1
        className={clsxm(
          'pb-7 text-md font-normal leading-8 text-black',
          'md:text-lg md:leading-lg'
        )}
      >
        Czy napewno chcesz zresetować hasło dla użytkownika m.karolak@mera.pl?
      </h1>
      <p className='text-gray md:pb-32'>
        Na podany adres email zostanie wysłana wiadomość z linkiem do resetu
        hasła.
      </p>
      <div className='flex items-center justify-center gap-2.5'>
        <Button variant='secondary' handleClick={handleClose}>
          {t('cancel')}
        </Button>
        <SubmitButton
          label={t('resetPassword')}
          loading={isLoading}
          handleClick={() => {
            mutate({}, { onSuccess: () => handleClose() });
          }}
        />
      </div>
    </div>
  );
};
