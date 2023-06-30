import { AddMessageForm } from './AddMessageForm';

type CaseDetailsAddMessageSectionProps = {
  id: string;
  token: string;
  data: any;
  refetch: () => void;
  isCustomerService?: boolean;
};

export const CaseDetailsAddMessageSection = ({
  data,
  id,
  token,
  isCustomerService,
  refetch,
}: CaseDetailsAddMessageSectionProps) => (
  <div>
    {data.status !== 'closed' && (
      <AddMessageForm
        {...{ id, token, handleRefresh: refetch, isCustomerService }}
      />
    )}
  </div>
);
