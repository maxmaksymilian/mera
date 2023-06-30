import { getCardTypeName } from '@/lib/helpers';
import { cardTypeOptions } from '@/lib/options/options';

import { Button } from '@/components/commons/Button';
import { ExpirationDateInput } from '@/components/commons/Form/Fields/ExpirationDateInput/ExpirationDateInput';
import { Input } from '@/components/commons/Form/Fields/Input';
import { Select } from '@/components/commons/Form/Fields/Select/Select';
import { SubmitButton } from '@/components/commons/Form/Fields/SubmitButton';
import { Form } from '@/components/commons/Form/Form';
import { FormMessage } from '@/components/commons/Form/FormMessage';
import { DocumentType } from '@/components/panel/MyData/MyDataPageContent';

import { useChangeDocumentForm } from './useChangeDocumentForm';

export type ChangeDocumentFormProps = {
  document: DocumentType;
  type?: string;
  handleClose: () => void;
  handleRefresh: () => void;
};

export const ChangeDocumentForm = ({
  document,
  handleClose,
  handleRefresh,
}: ChangeDocumentFormProps) => {
  const { error, form, isLoading, t } = useChangeDocumentForm({
    document,
    handleClose,
    handleRefresh,
  });
  return (
    <Form {...{ form, id: 'change-document-data-form' }}>
      <FormMessage content={error} type='error' />
      <div className='form-content mx-auto py-10 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-4'>
        <div className='relative pb-2.5 md:pb-0'>
          <Select
            label='documentType'
            name='type'
            value={getCardTypeName(form.values.type)}
            options={cardTypeOptions}
          />
        </div>
        <div className='grid grid-cols-2 gap-2.5'>
          <div className='relative pb-2.5 md:pb-0'>
            <Input label='documentNumber' name='number' />
          </div>
          <div className='relative pb-2.5 md:pb-0'>
            <ExpirationDateInput
              label='expirationDate'
              name='expiration_date'
              placeholder='expirationDatePlaceholder'
            />
          </div>
        </div>
        <div className='relative pb-2.5 md:pb-0'>
          <Input
            label='verified'
            name='verified_at'
            value={form.values.verified_at ? 'verified' : 'notVerified'}
          />
        </div>
      </div>
      <div className='mt-7 flex items-center justify-center gap-x-2.5'>
        <Button type='button' variant='secondary' handleClick={handleClose}>
          {t('cancel')}
        </Button>
        <SubmitButton label='saveChanges' loading={isLoading} />
      </div>
    </Form>
  );
};
