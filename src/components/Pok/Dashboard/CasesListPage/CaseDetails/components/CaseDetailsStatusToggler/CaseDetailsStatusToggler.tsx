import { casesStatusOptions } from '@/lib/options/options';

import { Select } from '@/components/commons/Form/Fields/Select/Select';
import { SubmitButton } from '@/components/commons/Form/Fields/SubmitButton';
import { Form } from '@/components/commons/Form/Form';

import { useCaseDetailsStatusToggler } from './useCaseDetailsStatusToggler';

type CaseDetailsStatusTogglerProps = {
  status: string;
  userId: string;
  caseId: string;
  refetch: () => void;
};

export const CaseDetailsStatusToggler = ({
  status,
  caseId,
  userId,
  refetch,
}: CaseDetailsStatusTogglerProps) => {
  const { form, isLoading, t } = useCaseDetailsStatusToggler({
    status,
    caseId,
    userId,
    refetch,
  });

  return (
    <>
      <h4 className='pb-2.5 text-base font-bold leading-6'>
        {t('pok.caseDetails.caseStatus')}
      </h4>
      <Form {...{ form, className: 'flex flex-col gap-3' }}>
        <div className='py-2.5'>
          <Select
            name='status'
            placeholder='caseStatus'
            className='w-full'
            options={casesStatusOptions}
          />
        </div>
        <SubmitButton type='submit' label='saveChange' loading={isLoading} />
      </Form>
    </>
  );
};
