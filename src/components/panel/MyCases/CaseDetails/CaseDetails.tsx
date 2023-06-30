import { Link } from '@/components/commons/Link';
import { Modal } from '@/components/commons/Modal/Modal';
import { ContinueCaseModalContent } from '@/components/panel/MyCases/CaseDetails/components/ContinueCaseModalContent';

import { CaseDetailsAddMessageSection } from './components/CaseDetailsAddMessageSection';
import { CaseDetailsConversation } from './components/CaseDetailsConversation';
import { CaseDetailsDescription } from './components/CaseDetailsDescription';
import { useCaseDetails } from './useCaseDetails';

export type CaseDetailsProps = {
  id: string;
};

export const CaseDetails = ({ id }: CaseDetailsProps) => {
  const {
    conversationRef,
    data,
    isOpen,
    token,
    status,
    handleSubmit,
    t,
    setIsOpen,
    refetch,
  } = useCaseDetails({ id });

  // TODO: DODAĆ DATĘ ZAMKNIĘCIA

  return (
    <>
      {status === 'success' && data && (
        <>
          <header className='border-cloud pt-8 pb-14 md:border-b'>
            <h1 className='pb-2.5 text-md leading-8 text-black md:pb-0 md:text-lg md:font-normal md:leading-lg'>
              {data.number} - {data.title}
            </h1>
            <Link href='/panel/sprawy' className='text-navy'>
              {t('backToCasesList')}
            </Link>
          </header>
          <main className='pb-28'>
            <CaseDetailsDescription {...{ data, setIsOpen }} />
            <CaseDetailsConversation {...{ conversationRef, data, id }} />
            <CaseDetailsAddMessageSection {...{ data, id, token, refetch }} />
          </main>
          {isOpen && (
            <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
              <ContinueCaseModalContent
                headline={t('caseReopenConfirmation')}
                content=' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.'
                handleClose={() => setIsOpen(false)}
                handleSubmit={handleSubmit}
              />
            </Modal>
          )}
        </>
      )}
    </>
  );
};
