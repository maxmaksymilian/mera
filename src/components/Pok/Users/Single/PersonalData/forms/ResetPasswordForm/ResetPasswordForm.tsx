import { Button } from '@/components/commons/Button';
import { SubmitButton } from '@/components/commons/Form/Fields/SubmitButton';
import { Form } from '@/components/commons/Form/Form';
import { FormMessage } from '@/components/commons/Form/FormMessage';

import { useResetPasswordForm } from './useResetPasswordForm';

export type ResetPasswordFormProps = {
  id: string;
  handleClose: () => void;
  handleRefresh: () => void;
};

export const ResetPasswordForm = ({
  id,
  handleClose,
  handleRefresh,
}: ResetPasswordFormProps) => {
  const { form, isLoading, error, t } = useResetPasswordForm({
    id,
    handleClose,
    handleRefresh,
  });

  return (
    <Form {...{ form }}>
      {error && <FormMessage type='error' content={error} />}
      <div className='flex h-36 items-center justify-center gap-2.5 pt-10'>
        <Button variant='secondary' handleClick={handleClose}>
          {t('cancel')}
        </Button>
        <SubmitButton loading={isLoading} label='submit' />
      </div>
    </Form>
  );
};
