import { globalStatusOptions } from '@/lib/options/options';

import { Button } from '@/components/commons/Button';
import { Select } from '@/components/commons/Form/Fields/Select/Select';
import { SubmitButton } from '@/components/commons/Form/Fields/SubmitButton';
import { Form } from '@/components/commons/Form/Form';
import { FormMessage } from '@/components/commons/Form/FormMessage';

import { useChangeCustomerStatusForm } from './useChangeCustomerStatusForm';

export type ChangeCustomerStatusFormProps = {
  id: string;
  status: 'active' | 'not_active';
  handleClose: () => void;
  handleRefresh: () => void;
};

export const ChangeCustomerStatusForm = ({
  id,
  handleClose,
  handleRefresh,
}: ChangeCustomerStatusFormProps) => {
  const { form, isLoading, error, t } = useChangeCustomerStatusForm({
    id,
    handleClose,
    handleRefresh,
  });

  return (
    <Form {...{ id: 'change-customer-status-form', form }}>
      {error && <FormMessage type='error' content={error} />}
      <div className='h-64 py-10'>
        <Select
          name='status'
          options={globalStatusOptions}
          placeholder='status'
          label='status'
        />
      </div>
      <div className='flex items-center justify-center gap-2.5'>
        <Button variant='secondary'>{t('cancel')}</Button>
        <SubmitButton loading={isLoading} label='saveChanges' />
      </div>
    </Form>
  );
};
