import { Button } from '@/components/commons/Button';
import SearchDropdown from '@/components/commons/Form/Fields/Select/SearchDropdown/SearchDropdown';
import { Select } from '@/components/commons/Form/Fields/Select/Select';
import { SubmitButton } from '@/components/commons/Form/Fields/SubmitButton';
import { Form } from '@/components/commons/Form/Form';
import { FormMessage } from '@/components/commons/Form/FormMessage';
import { options } from '@/components/panel/MyCases/MyCasesModel';
import {
  Order,
  User,
} from '@/components/Pok/Dashboard/CasesListPage/CaseDetails/components/CaseDetailsDescription';

import { useCaseDetailsEditDataModalContent } from './useCaseDetailsEditDataModalContent';

export type CaseDetailsEditDataModalContentProps = {
  userId: string;
  caseId: string;
  user: User;
  type: string;
  handleClose: () => void;
  handleRefresh: () => void;
  employee?: User;
  order?: Order;
};

export const CaseDetailsEditDataModalContent = ({
  employee,
  type,
  user,
  order,
  caseId,
  userId,
  handleClose,
  handleRefresh,
}: CaseDetailsEditDataModalContentProps) => {
  const { error, form, isLoading, t } = useCaseDetailsEditDataModalContent({
    type,
    caseId,
    userId,
    employee,
    user,
    order,
    handleClose,
    handleRefresh,
  });

  return (
    <div className='w-full max-w-4xl px-8 py-12 md:py-10 md:px-11 lg:w-lg'>
      <h1 className='pb-4 text-md font-normal leading-8 text-black md:text-4xl md:leading-9'>
        {t('editCase')}
      </h1>
      <Form {...{ form, id: 'change-general-data-form' }}>
        {error && <FormMessage type='error' content={error} />}
        <div className='form-content mx-auto py-5'>
          <div className='relative pb-6'>
            <SearchDropdown
              name='guardian'
              label='caseOperator'
              route='EMPLOYEE_LIST'
              isFullName
              isClear
            />
          </div>
          <div className='relative pb-6'>
            <SearchDropdown
              name='transaction'
              label='relatedTransaction'
              route='USER_TRANSACTION_LIST'
              userId={userId}
              isClear
            />
          </div>
          <div className='relative pb-6'>
            <Select
              name='type'
              label='case_type'
              options={options.type}
              placeholder='caseType'
            />
          </div>
        </div>
        <div className='mt-7 flex items-center justify-center gap-x-2.5'>
          <Button type='button' variant='secondary' handleClick={handleClose}>
            {t('cancel')}
          </Button>
          <SubmitButton loading={isLoading} label='saveChanges' />
        </div>
      </Form>
    </div>
  );
};
