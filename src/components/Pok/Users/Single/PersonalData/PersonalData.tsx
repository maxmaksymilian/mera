import { useAuth } from '@/hooks/useAuth';

import { Button } from '@/components/commons/Button';
import { DataSectionTemplate } from '@/components/commons/DataSectionTemplate';
import { Link } from '@/components/commons/Link';
import { Modal } from '@/components/commons/Modal/Modal';
import { Skeleton } from '@/components/commons/Skeleton/Skeleton';
import { Status } from '@/components/commons/Status';

import { DiscountsSection } from './components/DiscountsSection';
import { ModalContent } from './components/ModalContent';
import { modalCustomerDesc, sectionsHeaders } from './PersonalDataModel';
import { useCustomerData } from './usePersonalData';

export type CustomerDataPageProps = {
  id: string;
  openModal: boolean;
};

export type ProfileType = {
  email: string;
  first_name: string;
  last_name: string;
  telephone: {
    prefix: string;
    telephone: string;
  };
  pesel: string;
};

export type AddressType = {
  street: string;
  zip: string;
  city: string;
  number: string;
  apt_number: string;
};

export type DocumentType = {
  type: string;
  number: string;
  expiration_date: string;
  verified_at: string | null;
};

export type ModalDescType = {
  headline: string;
  subHeadline: string;
  type?: string;
};

export const CustomerDataPage = (props: CustomerDataPageProps) => {
  const {
    data,
    isModalOpen,
    modalData,
    status,
    refetch,
    setIsModalOpen,
    setModalData,
    t,
  } = useCustomerData(props);
  const { hasAccess } = useAuth();
  const { id } = props;

  //  TODO: DISCOUNTS MODAL ERROR
  //  TODO: FILL DISCOUNT SECTION
  //  TODO: NO STATUS DATA IN RETURNED DATA

  const mappedGeneralData = sectionsHeaders.generalData.map((item) => ({
    label: item.label,
    value: data?.profile ? data?.profile[item.value] : '',
  }));

  const mappedResidentialAddress = sectionsHeaders.registeredAddress.map(
    (item) => ({
      label: item.label,
      value: data?.address_residential
        ? data?.address_residential[item.value]
        : '',
    })
  );

  const mappedRegisteredAddress = sectionsHeaders.registeredAddress.map(
    (item) => ({
      label: item.label,
      value: data?.address_registered
        ? data?.address_registered[item.value]
        : '',
    })
  );

  return (
    <>
      <div className='md:grid md:grid-cols-2 md:gap-16'>
        <div className='flex flex-col'>
          {hasAccess('profile.data') ? (
            <DataSectionTemplate
              headline={t('basicInformation')}
              buttonText={t('editBasicInformation')}
              handleClick={() => {
                setModalData(modalCustomerDesc.generalData);
                setIsModalOpen(true);
              }}
              isLoading={status === 'loading'}
              items={mappedGeneralData}
            />
          ) : null}
          {hasAccess('profile.data') ? (
            <DataSectionTemplate
              headline={t('yourAdress')}
              buttonText={t('editYourAdress')}
              handleClick={() => {
                setModalData(modalCustomerDesc.addressResidential);
                setIsModalOpen(true);
              }}
              isLoading={status === 'loading'}
              items={mappedResidentialAddress}
            />
          ) : null}
          {hasAccess('profile.data') ? (
            <DataSectionTemplate
              headline={t('registeredAddress')}
              buttonText={t('editRegisteredAddress')}
              handleClick={() => {
                setModalData(modalCustomerDesc.addressRegistered);
                setIsModalOpen(true);
              }}
              isLoading={status === 'loading'}
              items={mappedRegisteredAddress}
            />
          ) : null}
        </div>
        <div>
          {hasAccess('profile.status') ? (
            <DataSectionTemplate
              headline={t('accountStatus')}
              buttonText={t('editYourAdress')}
              handleClick={() => {
                setModalData(modalCustomerDesc.status);
                setIsModalOpen(true);
              }}
            >
              {status === 'loading' ? (
                <Skeleton />
              ) : (
                <Status value={data.status} />
              )}
            </DataSectionTemplate>
          ) : null}
          {hasAccess('profile.document') ? (
            <DataSectionTemplate
              headline={t('eligibleDiscounts')}
              buttonText={t('editYourAdress')}
              handleClick={() => {
                setModalData(modalCustomerDesc.document);
                setIsModalOpen(true);
              }}
            >
              <DiscountsSection
                document={data?.document}
                isLoading={status === 'loading'}
              />
            </DataSectionTemplate>
          ) : null}
          <div className='pb-10'>
            {hasAccess('profile.password') ? (
              <div className='md:hidden'>
                <p className='py-5 font-bold'>{t('editPassword')}</p>
                <Button
                  variant='secondary'
                  className='h-12 w-full'
                  handleClick={() => {
                    setModalData(modalCustomerDesc.password);
                    setIsModalOpen(true);
                  }}
                >
                  {t('editPassword')}
                </Button>
              </div>
            ) : null}
            <div className='hidden md:grid md:grid-cols-2 md:gap-12'>
              {hasAccess('profile.password') ? (
                <DataSectionTemplate
                  headline={t('editPassword')}
                  buttonText={t('editPassword')}
                  isBtnHidden={true}
                >
                  <div className='hidden md:block'>
                    <Button
                      handleClick={() => {
                        setModalData(modalCustomerDesc.reset_password);
                        setIsModalOpen(true);
                      }}
                    >
                      {t('pok.customerData.passwordChangeLinkReset')}
                    </Button>
                  </div>
                </DataSectionTemplate>
              ) : null}
              {hasAccess('profile.history') ? (
                <DataSectionTemplate
                  headline={t('changeHistory')}
                  buttonText={t('checkChangeHistory')}
                  isBtnHidden={true}
                >
                  <div className='hidden md:block'>
                    <Link
                      href={`/pok/baza-klientow/${id}/dane-klienta/historia-zmian`}
                    >
                      <Button>{t('checkChangeHistory')}</Button>
                    </Link>
                  </div>
                </DataSectionTemplate>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && status === 'success' && data && (
        <Modal isOpen={isModalOpen} handleClose={() => setIsModalOpen(false)}>
          <ModalContent
            {...modalData}
            data={{
              profile: data.profile,
              address_residential: data.address_residential,
              address_registered: data.address_registered,
              document: data.document,
              status: data.status,
            }}
            id={id}
            handleClose={() => setIsModalOpen(false)}
            handleRefresh={() => refetch()}
          />
        </Modal>
      )}
    </>
  );
};
