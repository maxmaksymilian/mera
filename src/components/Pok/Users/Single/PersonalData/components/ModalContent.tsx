import useTranslation from 'next-translate/useTranslation';

import { MyDataPageContentType } from '@/components/panel/MyData/MyDataPageContent';
import { ChangeCustomerAddressRegisteredForm } from '@/components/Pok/Users/Single/PersonalData/forms/ChangeCustomerAddressRegisteredForm/ChangeCustomerAddressRegisteredForm';
import { ChangeCustomerAddressResidentialForm } from '@/components/Pok/Users/Single/PersonalData/forms/ChangeCustomerAddressResidentalForm/ChangeCustomerAddressResidentalForm';
import { ChangeCustomerDocumentForm } from '@/components/Pok/Users/Single/PersonalData/forms/ChangeCustomerDocumentForm/ChangeCustomerDocumentForm';
import { ChangeCustomerGeneralDataForm } from '@/components/Pok/Users/Single/PersonalData/forms/ChangeCustomerGeneralDataForm/ChangeCustomerGeneralDataForm';
import { ChangeCustomerStatusForm } from '@/components/Pok/Users/Single/PersonalData/forms/ChangeCustomerStatusForm/ChangeCustomerStatusForm';
import { ResetPasswordForm } from '@/components/Pok/Users/Single/PersonalData/forms/ResetPasswordForm/ResetPasswordForm';

type ModalContentProps = {
  id: string;
  headline: string;
  subHeadline: string;
  data: MyDataPageContentType;
  userId?: string;
  type?: string;
  handleClose: () => void;
  handleRefresh: () => void;
};

export const ModalContent = ({
  id,
  type,
  data,
  headline,
  subHeadline,
  handleClose,
  handleRefresh,
}: ModalContentProps) => {
  const { t } = useTranslation('common');
  const formPicker = (type = '') => {
    switch (type) {
      case 'generalData':
        return (
          <ChangeCustomerGeneralDataForm
            profile={data.profile}
            {...{ id, type, handleClose, handleRefresh }}
          />
        );
      case 'addressResidential':
        return (
          <ChangeCustomerAddressResidentialForm
            address={data.address_residential}
            {...{ id, type, handleClose, handleRefresh }}
          />
        );
      case 'addressRegistered':
        return (
          <ChangeCustomerAddressRegisteredForm
            address={data.address_registered}
            {...{ id, type, handleClose, handleRefresh }}
          />
        );
      case 'document':
        return (
          <ChangeCustomerDocumentForm
            {...{ id, type, handleClose, handleRefresh }}
          />
        );
      case 'status':
        return (
          <ChangeCustomerStatusForm
            status='active'
            {...{ id, type, handleClose, handleRefresh }}
          />
        );

      case 'reset_password':
        return (
          <ResetPasswordForm {...{ id, type, handleClose, handleRefresh }} />
        );
      default:
        return null;
    }
  };
  const chosenForm = formPicker(type);
  return (
    <div className='w-full max-w-4xl px-8 py-12 md:py-10 md:px-11 lg:w-lg'>
      <h1 className='pb-4 text-md font-normal leading-8 text-black md:text-4xl md:leading-9'>
        {t(headline)}
      </h1>
      <h2 className='text-base font-normal leading-6 text-gray'>
        {t(subHeadline)}
      </h2>
      {chosenForm}
    </div>
  );
};
