import { useMultiStepForm } from '@/hooks/useMultiStepForm';

import { WizardStepLayout } from '@/components/Layouts/Panel/components/Wizard';

export type WizardProps = {
  handleClose: () => void;
};

export type WizardMutationType = { token?: string } & DiscountType &
  CardType &
  AddressType &
  CompanyType &
  RegisteredType;

type DiscountType = {
  is_discount: boolean;
  document_front: File | null;
  document_back: File | null;
  document_discount: string;
};

type CardType = {
  card_type: string;
  card_name: string;
  card_number: string;
  card_expiration_date: string;
};

type AddressType = {
  address_zip: string;
  address_city: string;
  address_street: string;
  address_number: string;
  address_apt_number: string;
};

type CompanyType = {
  company: boolean | string;
  company_name: string;
  company_nip: string;
  company_address_zip: string;
  company_address_city: string;
  company_address_street: string;
  company_address_number: string;
};

type RegisteredType = {
  registered_address_street: string;
  registered_address_zip: string;
  registered_address_city: string;
  registered_address_number: string;
  registered_address_apt_number: string;
  registered_address: boolean | string;
};

export const Wizard = ({ handleClose }: WizardProps) => {
  const {
    currentStep,
    currentStepDescData,
    isFirstStep,
    isLastStep,
    isValid,
    stepsCount,
    formState: { currentStepIndex, isLoading },
    dispatch,
    handleSubmit,
  } = useMultiStepForm();

  return (
    <div>
      <form id='wizard-form' onSubmit={handleSubmit}>
        <WizardStepLayout
          isValid={isValid}
          stepsCount={stepsCount}
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          currentStepIndex={currentStepIndex}
          isLoading={isLoading}
          dispatch={dispatch}
          handleClose={handleClose}
          {...currentStepDescData}
        >
          {currentStep}
        </WizardStepLayout>
      </form>
    </div>
  );
};
