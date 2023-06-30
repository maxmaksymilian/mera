import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import { convertDate } from '@/lib/helpers';

import { Button } from '@/components/commons/Button';
import { DataSectionTemplate } from '@/components/commons/DataSectionTemplate/DataSectionTemplate';
import { Link } from '@/components/commons/Link';
import { Modal } from '@/components/commons/Modal/Modal';
import { Status } from '@/components/commons/Status';
import { ModalContent } from '@/components/panel/MyData/ModalContent';

import { modalDesc } from './const';

export type MyDataPageContentType = {
  profile: ProfileType;
  address_residential: AddressType;
  address_registered: AddressType;
  document: DocumentType;
  status?: any;
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
  name: any;
  discount: { name: any };
  number: string;
  expiration_date: string;
  verified_at: string | null;
  document_discount_type?: string;
};

export type ModalDescType = {
  headline: string;
  subHeadline: string;
  type?: string;
};

export const MyDataPageContent = ({
  profile,
  address_residential,
  address_registered,
  document,
  refetch,
}: { refetch: any } & MyDataPageContentType) => {
  const { t } = useTranslation('common');
  const [modalData, setModalData] = useState<ModalDescType>(modalDesc.password);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <div className='px-0 md:grid md:grid-cols-2 md:gap-16 md:px-9 lg:px-0'>
        <div className='flex flex-col'>
          <DataSectionTemplate
            headline={t('basicInformation')}
            buttonText={t('editBasicInformation')}
            handleClick={() => {
              setModalData(modalDesc.generalData);
              setIsModalOpen(true);
            }}
          >
            <div className='flex justify-between pb-2 md:pb-0'>
              <p className='w-1/2 text-sm leading-6 text-gray md:text-base md:leading-9'>
                {t('name')}
              </p>
              <p className='w-1/2 text-sm leading-6 text-black md:text-base md:leading-9'>
                {profile?.first_name}
              </p>
            </div>
            <div className='flex justify-between pb-2 md:pb-0'>
              <p className='w-1/2 text-sm leading-6 text-gray md:text-base md:leading-9'>
                {t('surname')}
              </p>
              <p className='w-1/2 text-sm leading-6 text-black md:text-base md:leading-9'>
                {profile?.last_name}
              </p>
            </div>
            <div className='flex justify-between pb-2 md:pb-0'>
              <p className='w-1/2 text-sm leading-6 text-gray md:text-base md:leading-9'>
                {t('pesel')}
              </p>
              <p className='w-1/2 text-sm leading-6 text-black md:text-base md:leading-9'>
                {profile?.pesel}
              </p>
            </div>
            <div className='flex justify-between pb-2 md:pb-0'>
              <p className='w-1/2 text-sm leading-6 text-gray md:text-base md:leading-9'>
                {t('email')}
              </p>
              <p className='w-1/2 break-words text-sm leading-6 text-black md:text-base md:leading-9'>
                {profile?.email}
              </p>
            </div>
            <div className='flex justify-between pb-2 md:pb-0'>
              <p className='w-1/2 text-sm leading-6 text-gray md:text-base md:leading-9'>
                {t('phone')}
              </p>
              <p className='w-1/2 text-sm leading-6 text-black md:text-base md:leading-9'>
                {profile?.telephone.prefix} {profile?.telephone.telephone}
              </p>
            </div>
          </DataSectionTemplate>
          {address_registered && (
            <DataSectionTemplate
              headline={t('yourAdress')}
              buttonText={t('editYourAdress')}
              handleClick={() => {
                setModalData(modalDesc.addressResidential);
                setIsModalOpen(true);
              }}
            >
              <div>
                <div className='flex justify-between pb-2 md:pb-0'>
                  <p className='w-1/2 text-sm leading-6 text-gray md:text-base md:leading-9'>
                    {t('street')}
                  </p>
                  <p className='w-1/2 text-sm leading-6 text-black md:text-base md:leading-9'>
                    {address_residential.street}
                  </p>
                </div>
                <div className='flex justify-between pb-2 md:pb-0'>
                  <p className='w-1/2 text-sm leading-6 text-gray md:text-base md:leading-9'>
                    {t('houseNumber')}
                  </p>
                  <p className='w-1/2 text-sm leading-6 text-black md:text-base md:leading-9'>
                    {address_residential.number}
                  </p>
                </div>
                <div className='flex justify-between pb-2 md:pb-0'>
                  <p className='w-1/2 text-sm leading-6 text-gray md:text-base md:leading-9'>
                    {t('apartmentNumberShort')}
                  </p>
                  <p className='w-1/2 text-sm leading-6 text-black md:text-base md:leading-9'>
                    {address_residential.apt_number}
                  </p>
                </div>
                <div className='flex justify-between pb-2 md:pb-0'>
                  <p className='w-1/2 text-sm leading-6 text-gray md:text-base md:leading-9'>
                    {t('zip')}
                  </p>
                  <p className='w-1/2 text-sm leading-6 text-black md:text-base md:leading-9'>
                    {address_residential.zip}
                  </p>
                </div>
                <div className='flex justify-between pb-2 md:pb-0'>
                  <p className='w-1/2 text-sm leading-6 text-gray md:text-base md:leading-9'>
                    {t('city')}
                  </p>
                  <p className='w-1/2 text-sm leading-6 text-black md:text-base md:leading-9'>
                    {address_residential.city}
                  </p>
                </div>
              </div>
            </DataSectionTemplate>
          )}
          {address_residential && (
            <DataSectionTemplate
              headline={t('registeredAddress')}
              buttonText={t('editRegisteredAddress')}
              handleClick={() => {
                setModalData(modalDesc.addressRegistered);
                setIsModalOpen(true);
              }}
            >
              <div>
                <div className='flex justify-between pb-2 md:pb-0'>
                  <p className='w-1/2 text-sm leading-6 text-gray md:text-base md:leading-9'>
                    {t('street')}
                  </p>
                  <p className='w-1/2 text-sm leading-6 text-black md:text-base md:leading-9'>
                    {address_registered.street}
                  </p>
                </div>
                <div className='flex justify-between pb-2 md:pb-0'>
                  <p className='w-1/2 text-sm leading-6 text-gray md:text-base md:leading-9'>
                    {t('houseNumber')}
                  </p>
                  <p className='w-1/2 text-sm leading-6 text-black md:text-base md:leading-9'>
                    {address_registered.number}
                  </p>
                </div>
                <div className='flex justify-between pb-2 md:pb-0'>
                  <p className='w-1/2 text-sm leading-6 text-gray md:text-base md:leading-9'>
                    {t('apartmentNumberShort')}
                  </p>
                  <p className='w-1/2 text-sm leading-6 text-black md:text-base md:leading-9'>
                    {address_registered.apt_number}
                  </p>
                </div>
                <div className='flex justify-between pb-2 md:pb-0'>
                  <p className='w-1/2 text-sm leading-6 text-gray md:text-base md:leading-9'>
                    {t('zip')}
                  </p>
                  <p className='w-1/2 text-sm leading-6 text-black md:text-base md:leading-9'>
                    {address_registered.zip}
                  </p>
                </div>
                <div className='flex justify-between pb-2 md:pb-0'>
                  <p className='w-1/2 text-sm leading-6 text-gray md:text-base md:leading-9'>
                    {t('city')}
                  </p>
                  <p className='w-1/2 text-sm leading-6 text-black md:text-base md:leading-9'>
                    {address_registered.city}
                  </p>
                </div>
              </div>
            </DataSectionTemplate>
          )}
        </div>
        <div>
          <DataSectionTemplate
            access='client'
            headline={t('eligibleDiscounts')}
            buttonText={t('newDiscountCase')}
            isBtnHidden={document ? false : true}
            handleClick={() => {
              setModalData(modalDesc.discount);
              setIsModalOpen(true);
            }}
          >
            <div>
              <div className='md:flex md:gap-5'>
                {document ? null : (
                  <Button
                    handleClick={() => {
                      setModalData(modalDesc.discount);
                      setIsModalOpen(true);
                    }}
                  >
                    {t('editDiscount')}
                  </Button>
                )}
                {document && (
                  <div className='hidden md:block'>
                    <div className='flex gap-20'>
                      <div className='w-1/2'>
                        <div>
                          {document.discount.name}
                          <p className='pt-2 text-gray'>
                            {t('documentNumber')}
                          </p>
                          <p className='pt-2 text-gray'>{t('validityTerm')}:</p>
                        </div>
                      </div>
                      <div className='w-1/2'>
                        <Status
                          value={document.verified_at ? 'active' : 'not_active'}
                        />
                        <p className='pt-2 text-gray'>{document.number}</p>
                        <p className='pt-2 text-gray'>
                          {convertDate(document.expiration_date)}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                {document && (
                  <div className='md:hidden'>
                    <div className='flex justify-between pb-2 md:pb-0'>
                      <p className='w-1/2 text-sm leading-6 text-black md:text-base md:leading-9'>
                        {document.discount.name}
                      </p>
                      <p className='w-1/2 text-sm leading-6 text-black'>
                        <Status
                          value={document.verified_at ? 'active' : 'not_active'}
                        />
                      </p>
                    </div>
                    <div className='flex justify-between pb-2 md:pb-0'>
                      <p className='w-1/2 text-sm leading-6 text-gray md:text-base md:leading-9'>
                        {t('numberID')}
                      </p>
                      <p className='w-1/2 text-sm leading-6 text-black md:text-base md:leading-9'>
                        {document.number}
                      </p>
                    </div>
                    <div className='flex justify-between pb-2 md:pb-0'>
                      <p className='w-1/2 text-sm leading-6 text-gray md:text-base md:leading-9'>
                        {t('validityTerm')}
                      </p>
                      <p className='w-1/2 text-sm leading-6 text-black md:text-base md:leading-9'>
                        {convertDate(document.expiration_date)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </DataSectionTemplate>
          <div className='hidden md:grid md:grid-cols-2 md:gap-12'>
            <DataSectionTemplate
              headline={t('editPassword')}
              buttonText={t('editPassword')}
              isBtnHidden={true}
            >
              <div className='hidden md:block'>
                <Button
                  handleClick={() => {
                    setModalData(modalDesc.password);
                    setIsModalOpen(true);
                  }}
                >
                  {t('editPassword')}
                </Button>
              </div>
            </DataSectionTemplate>
            <DataSectionTemplate
              headline={t('changeHistory')}
              buttonText={t('checkChangeHistory')}
              isBtnHidden={true}
            >
              <div className='hidden md:block'>
                <Link href='/panel/moje-dane/historia'>
                  <Button>{t('checkChangeHistory')}</Button>
                </Link>
              </div>
            </DataSectionTemplate>
          </div>
          <div className='pb-10'>
            <div className='md:hidden'>
              <p className='py-5 font-bold'>{t('editPassword')}</p>
              <Button
                variant='secondary'
                className='h-12 w-full'
                handleClick={() => {
                  setModalData(modalDesc.password);
                  setIsModalOpen(true);
                }}
              >
                {t('editPassword')}
              </Button>
            </div>
            <div className='md:hidden'>
              <p className='py-5 font-bold'>{t('changeHistory')}</p>
              <Link href='/panel/moje-dane/historia'>
                <Button variant='secondary' className='h-12 w-full'>
                  {t('checkChangeHistory')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} handleClose={() => setIsModalOpen(false)}>
          <ModalContent
            {...modalData}
            data={{
              profile,
              address_residential,
              address_registered,
              document,
            }}
            handleClose={() => setIsModalOpen(false)}
            handleRefresh={() => refetch()}
          />
        </Modal>
      )}
    </>
  );
};
