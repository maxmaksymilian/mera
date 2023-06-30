import { FormikContextType, FormikValues } from 'formik';

import { PaginationRecordsTab } from '@/components/commons/Pagination/components/PaginationRecordsTab';
import { Pagination } from '@/components/commons/Pagination/Pagination';

type PaginationProps = {
  to: number;
  from: number;
  total: number;
  current: number;
  last: number;
  tableId: string;
};

type PaginationListWrapperProps = {
  pagination: PaginationProps;
  children: JSX.Element;
  form: FormikContextType<FormikValues>;
};

export const PaginationListWrapper = ({
  pagination,
  children,
  form,
}: PaginationListWrapperProps) => (
  <div>
    <PaginationRecordsTab
      recordsPerPage={form.values?.perPage || '25'}
      pageLastRecord={pagination?.to}
      pageFirstRecord={pagination?.from}
      recordsCount={pagination?.total}
      form={form}
    />
    {children}
    <Pagination {...{ ...pagination, pageSize: form.values.perPage }} />
  </div>
);
