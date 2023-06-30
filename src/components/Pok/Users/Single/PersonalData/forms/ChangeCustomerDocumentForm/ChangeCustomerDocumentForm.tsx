import { useApiQuery } from '@/hooks/api/useApiQuery';

import { Button } from '@/components/commons/Button';
import { CustomSelectInput } from '@/components/commons/CustomSelectInput/CustomSelectInput';
import { DatePickerInput } from '@/components/commons/Form/Fields/DatepickerInput';
import { Input } from '@/components/commons/Form/Fields/Input';
import { SubmitButton } from '@/components/commons/Form/Fields/SubmitButton';
import { Form } from '@/components/commons/Form/Form';
import { FormMessage } from '@/components/commons/Form/FormMessage';

import { useChangeCustomerDocumentForm } from './useChangeCustomerDocumentForm';

export type ChangeCustomerDocumentFormProps = {
  id: string;
  type?: string;
  handleClose: () => void;
  handleRefresh: () => void;
};

export const ChangeCustomerDocumentForm = ({
  id,
  handleClose,
  handleRefresh,
}: ChangeCustomerDocumentFormProps) => {
  const { error, form, isLoading, t } = useChangeCustomerDocumentForm({
    id,
    handleClose,
    handleRefresh,
  });
  const { data, status } = useApiQuery({ route: 'DISCOUNTS_LIST' });
  return (
    <Form {...{ form, id: 'change-document-data-form' }}>
      <FormMessage content={error} type='error' />
      <div className='form-content mx-auto py-10 md:gap-x-8 md:gap-y-4'>
        {status === 'success' ? (
          <CustomSelectInput
            name='discount'
            value={form.values.value}
            options={[
              ...data.map((discount: any) => ({
                name: discount.name,
                value: discount.id,
              })),
            ]}
            label={t('discounts.input.discountType.label')}
            placeholder={t('discounts.input.discountType.placeholder')}
            setFieldValue={form.setFieldValue}
          />
        ) : null}
        <div className='grid grid-cols-2 gap-4 md:mt-4'>
          <div className='relative pb-2.5 md:pb-0'>
            <Input label='documentNumber' name='number' />
          </div>
          <div className='relative pb-2.5 md:pb-0'>
            <DatePickerInput
              label={t('expirationDateDiscount')}
              name='expiration_date'
            />
          </div>
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
