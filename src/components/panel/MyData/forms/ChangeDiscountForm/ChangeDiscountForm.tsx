import { useApiQuery } from '@/hooks/api/useApiQuery';

import { Button } from '@/components/commons/Button';
import { CustomSelectInput } from '@/components/commons/CustomSelectInput';
import { SubmitButton } from '@/components/commons/Form/Fields/SubmitButton';
import { Form } from '@/components/commons/Form/Form';
import { FormMessage } from '@/components/commons/Form/FormMessage';
import { FileDropField } from '@/components/Layouts/Panel/components/Wizard';
import { DocumentType } from '@/components/panel/MyData/MyDataPageContent';

import { useChangeDiscountForm } from './useChangeDiscountForm';

export type ChangeDiscountFormProps = {
  document: DocumentType;
  type?: string;
  value?: string;
  handleClose: () => void;
  handleRefresh: () => void;
};

export const ChangeDiscountForm = ({
  handleClose,
  handleRefresh,
}: ChangeDiscountFormProps) => {
  const { error, form, isLoading, t } = useChangeDiscountForm({
    handleClose,
    handleRefresh,
  });
  const { data, status } = useApiQuery({ route: 'DISCOUNTS_LIST' });
  return (
    <Form {...{ form, id: 'change-discount-data-form' }}>
      <FormMessage content={error} type='error' />
      <div className='form-content mx-auto grid py-10 md:gap-x-8 md:gap-y-4'>
        <div>
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
        </div>
        <div className='flex-1'>
          <p className='pb-3 text-base font-bold leading-6'>
            {t('discounts.files.headline')}
          </p>
          <p className='text-base leading-6 text-gray'>
            {t('discounts.files.info')}
          </p>
          <div className='upload-container flex flex-col items-start md:max-w-md md:flex-row'>
            <FileDropField
              name='front'
              headline={t('discounts.files.frontInputLabel')}
              value={form.values.front}
              setFieldValue={form.setFieldValue}
            />
            <FileDropField
              name='back'
              headline={t('discounts.files.backInputLabel')}
              value={form.values.back}
              setFieldValue={form.setFieldValue}
            />
          </div>
          <p className='text-base leading-6 text-gray'>
            {t('discounts.formatsLabel')}:
            <span className='font-semibold text-black'> pdf, jpg, png</span>.{' '}
            {t('discounts.maxFileWeightLabel')}:{' '}
            <span className='font-semibold text-black'> 1MB</span>
          </p>
        </div>
      </div>
      <div className='mt-7 flex items-center justify-center gap-x-2.5'>
        <Button type='button' variant='secondary' handleClick={handleClose}>
          {t('cancel')}
        </Button>
        <SubmitButton
          label='saveChanges'
          className='mt-0'
          loading={isLoading}
        />
      </div>
    </Form>
  );
};
