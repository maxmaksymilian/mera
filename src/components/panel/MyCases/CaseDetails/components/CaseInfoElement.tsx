import { clsxm } from '@/lib';

import { Status } from '@/components/commons/Status';
export type CaseInfoElementProps = {
  label: string;
  content: string;
  isStatus?: boolean;
};

export const CaseInfoElement = ({
  label,
  content,
  isStatus,
}: CaseInfoElementProps) => (
  <div>
    <p className='pb-1.5 text-base leading-6 text-gray'>{label}</p>
    <p
      className={clsxm(
        'text-base leading-6 text-black first-letter:uppercase',
        isStatus && 'flex items-center gap-1.5'
      )}
    >
      {isStatus ? (
        <Status {...{ value: content }} />
      ) : (
        <span className='first-letter:uppercase'>{content}</span>
      )}
    </p>
  </div>
);
