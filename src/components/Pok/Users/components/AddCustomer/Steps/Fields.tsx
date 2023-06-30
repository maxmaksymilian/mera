import { CreateCustomerForm } from '@/components/Forms/Admin/Customers/CreateCustomer/CreateCustomerForm';

type FieldsProps = {
  handleReload: () => void;
  setStep: () => void;
  setUserId: (id: string) => void;
};

export const Fields = ({
  handleReload,
  setStep,
  setUserId,
  ...props
}: FieldsProps) => (
  <>
    <div className='w-full'>
      <div className='mx-auto pb-5'>
        <h1 className='mb-5 text-lg font-normal'>Dodaj użytkownika</h1>
        <p className='text-base text-gray'>
          Dodaj nowe konto główne użytkownika
        </p>
      </div>
      <div className='relative hidden w-1/2 lg:block' />
    </div>
    <CreateCustomerForm
      {...{
        ...props,
        route: 'POK_USERS',
        method: 'POST',
        handleSubmit: ({ data }) => {
          setUserId(data.id);
          setStep();
          handleReload();
        },
      }}
    />
  </>
);
