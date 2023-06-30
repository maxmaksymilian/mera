import { Button } from '@/components/commons/Button';
import { Modal } from '@/components/commons/Modal/Modal';
import { CaseType } from '@/components/Pok/Dashboard/CasesListPage/CaseDetails/components/CaseDetailsDescription';
import { CaseDetailsEditDataModalContent } from '@/components/Pok/Dashboard/CasesListPage/CaseDetails/components/CaseDetailsEditDataModalContent/CaseDetailsEditDataModalContent';
import { CaseInfoElement } from '@/components/Pok/Dashboard/CasesListPage/CaseDetails/components/CaseInfoElement';

import { useCaseDetailsGeneralInfo } from './useCaseDetailsGeneralInfo';

export type CaseDetailsGeneralInfoProps = {
  data: CaseType;
  userId: string;
  caseId: string;
  refetch: () => void;
};

export const CaseDetailsGeneralInfo = ({
  data: { user, employee, created_at, updated_at, type, order },
  userId,
  caseId,
  refetch,
}: CaseDetailsGeneralInfoProps) => {
  const { isModalOpen, setIsModalOpen, t } = useCaseDetailsGeneralInfo({
    caseId,
    userId,
    refetch,
  });

  return (
    <>
      <div className='flex items-center justify-between pb-2.5'>
        <h4 className='text-base font-bold leading-6'>
          {t('pok.caseDetails.generalInfo')}
        </h4>
        <Button
          variant='noStyling'
          className='font-semibold text-navy'
          handleClick={() => setIsModalOpen(true)}
        >
          {t('buttonEdit')}
        </Button>
      </div>
      <div className='flex gap-2.5'>
        <div className='w-1/2'>
          <CaseInfoElement
            label='pok.caseDetails.info.client'
            value={user.profile.first_name + ' ' + user.profile.last_name}
          />
          <CaseInfoElement
            label='pok.caseDetails.info.created_at'
            value={created_at}
          />
          <CaseInfoElement
            label='pok.caseDetails.info.updated_at'
            value={updated_at}
          />
        </div>
        <div className='w-1/2'>
          <CaseInfoElement
            label='pok.caseDetails.info.operator'
            value={
              employee
                ? employee.profile.first_name + ' ' + employee.profile.last_name
                : ''
            }
          />
          <CaseInfoElement label='pok.caseDetails.info.type' value={type} />
          <CaseInfoElement
            label='pok.caseDetails.info.related_transaction'
            value={order?.order_number || 'brak'}
          />
        </div>
      </div>
      <Modal
        {...{ isOpen: isModalOpen, handleClose: () => setIsModalOpen(false) }}
      >
        <CaseDetailsEditDataModalContent
          {...{
            user,
            employee,
            order,
            created_at,
            updated_at,
            type,
            caseId,
            userId,
            handleClose: () => setIsModalOpen(false),
            handleRefresh: refetch,
          }}
        />
      </Modal>
    </>
  );
};
