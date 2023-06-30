import { phonePrefixOptions } from '@/lib/options/phonePrefix';

import { Button } from '@/components/commons/Button';
import { Container } from '@/components/commons/Container';
import { Input } from '@/components/commons/Form/Fields/Input';
import { PhonePrefixSelect } from '@/components/commons/Form/Fields/PhonePrefixSelect/PhonePrefixSelect';
import { SubmitButton } from '@/components/commons/Form/Fields/SubmitButton';
import { Form } from '@/components/commons/Form/Form';
import { FormMessage } from '@/components/commons/Form/FormMessage';

import { EditModalType } from './EditModalModel';
import { useEditModal } from './useEditModal';

export const EditModal = ({ handleClose, ...props }: EditModalType) => {
  const { form, error, isLoading } = useEditModal({ handleClose, ...props });

  return (
    <Container>
      <h1 className='mr-16 mt-2 pr-5 text-2xl font-normal md:mx-9 md:mt-10 md:mr-0 md:pr-24 md:text-lg'>
        Dane podstawowe - Edycja
      </h1>
      <p className='mb-2 mt-4 text-sm text-gray md:mx-10 md:mb-4 md:text-base'>
        Edytuj dane podstawowe
      </p>
      <Form {...{ form, className: 'flex flex-col gap-0 md:gap-3' }}>
        <div className='form'>
          <div className='mx-auto flex w-full flex-col gap-5 pb-2 md:mx-11 md:w-4/5'>
            <FormMessage content={error} type='error' />
            <div className='flex w-full flex-col gap-8 md:flex-row'>
              <div className='w-full md:w-1/2'>
                <Input
                  type='text'
                  name='first_name'
                  label='first_name*'
                  placeholder='typeFirst_name'
                />
              </div>
              <div className='w-full md:w-1/2'>
                <Input
                  type='text'
                  name='last_name'
                  label='last_name*'
                  placeholder='typeLast_name'
                />
              </div>
            </div>
            <div className='flex w-full flex-col gap-8 md:flex-row'>
              <div className='w-full md:w-1/2'>
                <Input
                  type='text'
                  name='pesel'
                  label='pesel*'
                  placeholder='typePesel'
                />
              </div>
              <div className='w-full md:w-1/2'>
                <Input
                  type='text'
                  name='email'
                  label='email'
                  placeholder='typeEmail'
                />
              </div>
            </div>
            <div className='mb-4 flex w-full flex-col gap-8 md:flex-row'>
              <div className='w-full md:w-1/2'>
                <PhonePrefixSelect
                  name='telephone_prefix'
                  label='telephone_prefix*'
                  options={phonePrefixOptions}
                />
              </div>
              <div className='w-full md:w-1/2'>
                <Input type='text' name='telephone' label='telephone' />
              </div>
            </div>
          </div>
        </div>
        <div className='mb-0 grid text-center md:mb-4 md:block'>
          <Button
            className='mr-0 mb-4 md:mr-5 md:mb-0'
            variant='secondary'
            handleClick={() => handleClose()}
          >
            Anuluj
          </Button>
          <SubmitButton
            className='mb-4 md:mb-0'
            label='saveChanges'
            loading={isLoading}
          />
        </div>
      </Form>
    </Container>
  );
};
