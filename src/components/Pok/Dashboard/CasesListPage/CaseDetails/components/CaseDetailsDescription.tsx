import { CaseDetailsGeneralInfo } from './CaseDetailsGeneralInfo/CaseDetailsGeneralInfo';
import { CaseDetailsStatusToggler } from './CaseDetailsStatusToggler/CaseDetailsStatusToggler';

export type User = {
  id: string;
  profile: {
    first_name: string;
    last_name: string;
  };
};

export type Order = {
  id: string;
  number?: string;
  order_number?: string;
};

export type CaseType = {
  id: string;
  number: string;
  created_at: string;
  updated_at: string;
  type: string;
  status: string;
  title: string;
  description: string;
  user: User;
  attachments: File[];
  correspondences: [];
  employee?: User;
  order?: Order;
};

type CaseDetailsDescriptionProps = {
  data: CaseType;
  userId: string;
  id: string;
  refetch: () => void;
};

export const CaseDetailsDescription = ({
  data,
  userId,
  id: caseId,
  refetch,
}: CaseDetailsDescriptionProps) => (
  <div className='flex gap-8 py-5 pb-12'>
    <div className='general-info w-9/12 border border-cloud p-7'>
      <CaseDetailsGeneralInfo {...{ data, caseId, userId, refetch }} />
    </div>
    <div className='status w-3/12 border border-cloud p-7'>
      <CaseDetailsStatusToggler
        {...{ status: data.status, caseId, userId, refetch }}
      />
    </div>
  </div>
);
