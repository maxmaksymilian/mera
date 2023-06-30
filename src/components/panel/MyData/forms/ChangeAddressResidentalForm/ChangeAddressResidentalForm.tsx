import { Button } from '@/components/commons/Button';
import { Input } from '@/components/commons/Form/Fields/Input';
import { SubmitButton } from '@/components/commons/Form/Fields/SubmitButton';
import { Form } from '@/components/commons/Form/Form';
import { FormMessage } from '@/components/commons/Form/FormMessage';
import { AddressType } from '@/components/panel/MyData/MyDataPageContent';

import { useChangeAddressResidentialForm } from './useChangeAddressResidentalForm';

export type ChangeAddressResidentialFormProps = {
  address: AddressType;
  type?: string;
  handleClose: () => void;
  handleRefresh: () => void;
};

export const ChangeAddressResidentialForm = ({
  address,
  handleClose,
  handleRefresh,
}: ChangeAddressResidentialFormProps) => {
  const { error, form, isLoading, t } = useChangeAddressResidentialForm({
    address,
    handleClose,
    handleRefresh,
  });
  return (
    <Form {...{ id: 'change-address-residential-data-form', form }}>
      {error && <FormMessage type='error' content={error} />}
      <div className='form-content mx-auto py-10 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-4'>
        <div className='relative pb-2.5 md:pb-0'>
          <Input label='street' name='street' type='text' />
        </div>
        <div className='grid grid-cols-2 gap-2.5'>
          <div className='relative pb-2.5 md:pb-0'>
            <Input label='houseNumber' name='number' type='text' />
          </div>
          <div className='relative pb-2.5 md:pb-0'>
            <Input label='apartmentNumberShort' name='apt_number' type='text' />
          </div>
        </div>
        <div className='relative pb-2.5 md:pb-0'>
          <Input label='city' name='city' type='text' />
        </div>
        <div className='relative pb-2.5 md:w-56 md:pb-0'>
          <Input label='zip' name='zip' type='text' />
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
