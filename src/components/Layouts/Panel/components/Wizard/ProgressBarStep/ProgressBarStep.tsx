import { clsxm } from '@/lib';

export type ProgressBarStepProps = {
  isPulsing?: boolean;
  isActive?: boolean;
};

export const ProgressBarStep = ({
  isPulsing,
  isActive,
}: ProgressBarStepProps) => (
  <div className='flex'>
    <div className='relative z-20 flex'>
      <div
        className={clsxm(
          'pulse-success box-content h-10 w-10 rounded-full border-8 border-white bg-cloud',
          isActive && 'bg-success',
          isPulsing && 'animate-pulse-progress-bar-success'
        )}
      >
        &nbsp;
      </div>
    </div>
  </div>
);
