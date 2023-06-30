import { useRef } from 'react';

import { clsxm, useAppStore } from '@/lib';
import { shortenFileName } from '@/lib/helpers';
import { useApiMutation } from '@/hooks/api/useApiMutation';

export type FileType = {
  id: string;
  mime: string;
  name: string;
};

export type CaseMessageType = {
  caseid: string;
  id: string;
  created_at: string;
  user: {
    id: string;
    profile: {
      first_name: string;
      last_name: string;
    };
  };
  message: string;
  attachments: FileType[];
  authorId: string;
};

export const CaseMessage = ({
  caseid,
  id,
  created_at,
  message,
  attachments,
  user,
  authorId,
}: CaseMessageType) => {
  const { token } = useAppStore();
  const { mutate } = useApiMutation({
    route: 'PROFILE_MY_CASES_CORRESPONDENCE_FILE',
    method: 'GET',
    params: { caseid, messageid: id },
    getFile: true,
  });
  const link = useRef<HTMLAnchorElement>(null);

  const getFileUpload = (fileid: string) => {
    mutate(
      { token, id: fileid },
      {
        onSuccess: ({ data }) => {
          const url = URL.createObjectURL(data);
          if (link.current) {
            link.current.href = url;
            link.current.click();
            link.current.href = '';
          }
        },
      }
    );
  };

  return (
    <div
      className={clsxm(
        'my-5 rounded-xs md:w-11/12',
        authorId !== user.id && 'ml-auto bg-cloud px-5 py-9 md:p-7'
      )}
    >
      <div className='flex items-center justify-between'>
        <p className='pb-4 text-base font-bold leading-6 text-black'>
          {user.profile.first_name} {user.profile.last_name}
        </p>
        <p className='pb-4 text-sm leading-5 text-black'>{created_at}</p>
      </div>
      <p className='text-gray'>{message}</p>
      <a className='hidden' ref={link} download />
      {attachments && attachments.length ? (
        <div className='uploaded-files pt-2'>
          {attachments.map((file) => (
            <a
              onClick={() => getFileUpload(file.id)}
              className='my-1 flex cursor-pointer items-center gap-2.5'
              key={file.id}
            >
              <div
                className={clsxm(
                  'flex h-8 w-8 items-center justify-center bg-[#50BEE8]'
                )}
              >
                <span className='text-xs font-bold uppercase text-white'>
                  IMG
                </span>
              </div>
              <div>
                <p className='text-sm font-normal leading-4 text-gray'>
                  {shortenFileName(file.name)}
                </p>
              </div>
            </a>
          ))}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};
