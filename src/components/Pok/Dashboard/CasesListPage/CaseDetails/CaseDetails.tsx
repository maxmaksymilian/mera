import { Container } from '@/components/commons/Container';
import { CaseDetailsSkeleton } from '@/components/commons/Skeleton/components/CaseDetailsSkeleton';
import { CaseDetailsAddMessageSection } from '@/components/panel/MyCases/CaseDetails/components/CaseDetailsAddMessageSection';
import { CaseDetailsConversation } from '@/components/panel/MyCases/CaseDetails/components/CaseDetailsConversation';

import { CaseDetailsDescription } from './components/CaseDetailsDescription';
import CaseDetailsHeader from './components/CaseDetailsHeader';
import { useCaseDetails } from './useCaseDetails';

type CaseDetailsProps = {
  userId: string;
  id: string;
};

export const CaseDetails = ({ userId, id }: CaseDetailsProps) => {
  const { conversationRef, data, status, token, refetch, setIsOpen } =
    useCaseDetails({ userId, id });

  return status === 'success' && data ? (
    <Container className='py-24'>
      <CaseDetailsHeader {...{ number: data.number, title: data.title }} />
      <main className='pb-28'>
        <CaseDetailsDescription
          {...{ data, setIsOpen, userId, id, status, refetch }}
        />
        <CaseDetailsConversation
          {...{ conversationRef, data, id }}
          isCustomerService
        />
        <CaseDetailsAddMessageSection
          {...{ data, id, token, refetch }}
          isCustomerService
        />
      </main>
    </Container>
  ) : (
    <CaseDetailsSkeleton />
  );
};
