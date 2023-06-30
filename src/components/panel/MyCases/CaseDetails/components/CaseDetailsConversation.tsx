import { RefObject } from 'react';

import { FileInfoComponent } from '@/components/commons/FileInfoComponent';

import { CaseMessage, CaseMessageType } from './CaseMessage';

type CaseDetailsConversationProps = {
  data: any;
  id: string;
  conversationRef: RefObject<HTMLElement>;
  isCustomerService?: boolean;
};

export const CaseDetailsConversation = ({
  id,
  conversationRef,
  data,
  isCustomerService,
}: CaseDetailsConversationProps) => {
  return (
    <section
      ref={conversationRef}
      className='conversation mt-10 max-h-screen overflow-auto px-2 md:mt-0 md:max-h-80'
    >
      <div className='case-description'>
        <div className='md:w-11/12'>
          <div className='flex items-center justify-between pb-5'>
            <p className='user-info font-bold leading-6'>
              {data?.user?.profile?.first_name} {data?.user?.profile?.last_name}
            </p>
            <p className='date text-sm leading-5 text-black'>
              {data.created_at}
            </p>
          </div>
          <p className='text-sm leading-6 text-gray'>{data.description}</p>
        </div>
        <div className='files py-2.5'>
          {data.attachments.map((item: any) => (
            <FileInfoComponent
              key={item.id}
              fileName={item.name}
              fileType={item.extension}
              fileSize={item.size}
              isRemovable={false}
              isConversation
            />
          ))}
          {data.correspondences.map((item: CaseMessageType) => (
            <CaseMessage
              key={item.id}
              {...{
                ...item,
                authorId: data.user.id,
                caseid: id,
                isCustomerService,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
