import useTranslation from 'next-translate/useTranslation';

import { ChangeDiscountForm } from '@/components/panel/MyData//forms/ChangeDiscountForm/ChangeDiscountForm';
import { ChangeDocumentForm } from '@/components/panel/MyData//forms/ChangeDocumentForm/ChangeDocumentForm';
import { ChangeGeneralDataForm } from '@/components/panel/MyData//forms/ChangeGeneralDataForm/ChangeGeneralDataForm';
import { ChangeAddressRegisteredForm } from '@/components/panel/MyData/forms/ChangeAddressRegisteredForm/ChangeAddressRegisteredForm';
import { ChangeAddressResidentialForm } from '@/components/panel/MyData/forms/ChangeAddressResidentalForm/ChangeAddressResidentalForm';
import { ChangePasswordForm } from '@/components/panel/MyData/forms/ChangePasswordForm/ChangePasswordForm';
import { MyDataPageContentType } from '@/components/panel/MyData/MyDataPageContent';

type ModalContentProps = {
  headline: string;
  subHeadline: string;
  data: MyDataPageContentType;
  userId?: string;
  type?: string;
  handleClose: () => void;
  handleRefresh: () => void;
};

export const ModalContent = ({
  type,
  data,
  headline,
  subHeadline,
  userId,
  handleClose,
  handleRefresh,
}: ModalContentProps) => {
  const { t } = useTranslation('common');
  const formPicker = (type = '') => {
    switch (type) {
      case 'password':
        return <ChangePasswordForm handleClose={handleClose} />;
      case 'generalData':
        return (
          <ChangeGeneralDataForm
            profile={data.profile}
            type={type}
            handleClose={handleClose}
            handleRefresh={handleRefresh}
          />
        );
      case 'addressResidential':
        return (
          <ChangeAddressResidentialForm
            address={data.address_residential}
            type={type}
            handleClose={handleClose}
            handleRefresh={handleRefresh}
          />
        );
      case 'addressRegistered':
        return (
          <ChangeAddressRegisteredForm
            address={data.address_registered}
            type={type}
            handleClose={handleClose}
            handleRefresh={handleRefresh}
          />
        );
      case 'document':
        return (
          <ChangeDocumentForm
            document={data.document}
            type={type}
            handleClose={handleClose}
            handleRefresh={handleRefresh}
          />
        );
      case 'discount':
        return (
          <ChangeDiscountForm
            document={data.document}
            type={type}
            handleClose={handleClose}
            handleRefresh={handleRefresh}
          />
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
