import { clsxm } from '@/lib';
import { shortenFileName } from '@/lib/helpers';

import { Icon } from '@/components/commons/Icon/Icon';

export type FileInfoComponentProps = {
  fileType: string;
  fileName: string;
  fileSize: number;
  isRemovable?: boolean;
  isConversation?: boolean;
  handleFileRemove?: () => void;
};

export const FileInfoComponent = ({
  fileType,
  fileSize,
  fileName,
  isRemovable = true,
  isConversation,
  handleFileRemove,
}: FileInfoComponentProps) => (
  <div className='my-1 flex items-start gap-2.5'>
    <div
      className={clsxm(
        'flex h-8 w-8 items-center justify-center ',
        fileType === 'pdf' && 'bg-[#F15642]',
        (fileType === 'jpg' || fileType === 'jpeg') && 'bg-[#50BEE8]',
        fileType === 'png' && 'bg-[#A066A9]'
      )}
    >
      <span className='text-xs font-bold uppercase text-white'>{fileType}</span>
    </div>
    <div>
      <p className='text-sm font-normal leading-4 text-gray'>
        {shortenFileName(fileName)}
      </p>
      <p className='text-xs text-gray'>
        {' '}
        {isConversation ? fileSize : `${(fileSize / 1000).toFixed()} kB`}{' '}
      </p>
    </div>
    {isRemovable && (
      <button onClick={handleFileRemove}>
        <Icon name='trash' className='h-6 w-5 object-cover' />
      </button>
    )}
  </div>
);
