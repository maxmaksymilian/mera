import { FormikContextType, FormikValues } from 'formik';
import useTranslation from 'next-translate/useTranslation';

import { optionsRecordsPerPage } from '@/lib/options/options';

import { Select } from '@/components/commons/Form/Fields/Select/Select';
import { Form } from '@/components/commons/Form/Form';

type PaginationRecordsTabProps = {
  pageFirstRecord: number;
  pageLastRecord: number;
  recordsCount: number;
  recordsPerPage: number;
  form: FormikContextType<FormikValues>;
};

export const PaginationRecordsTab = ({
  pageFirstRecord,
  pageLastRecord,
  recordsCount,
  form,
}: PaginationRecordsTabProps) => {
  const { t } = useTranslation('common');

  return (
    <div className='flex items-center justify-between pt-8 pb-7'>
      {recordsCount ? (
        <p className='text-sm leading-6 text-gray'>
          {pageFirstRecord} - {pageLastRecord} {t('from')} {recordsCount}{' '}
          {t('recordsCount')}
        </p>
      ) : null}
      <div className='ml-auto flex items-center gap-5'>
        <Form form={form}>
          <Select
            className='w-24'
            {...{
              name: 'perPage',
              options: optionsRecordsPerPage,
              dynamic: true,
            }}
          />
        </Form>
        <span className='text-sm leading-6 text-gray'>
          {t('recordsPerPage')}
        </span>
      </div>
    </div>
  );
};
