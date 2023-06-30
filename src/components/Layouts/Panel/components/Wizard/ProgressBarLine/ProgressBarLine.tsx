import { clsxm } from '@/lib';

export type ProgressBarLineProps = { currentStepIndex?: number };

export const ProgressBarLine = ({ currentStepIndex }: ProgressBarLineProps) => (
  <div
    className={clsxm(
      'z-1 absolute top-1/2 h-[3px] w-full -translate-y-1/2 bg-cloud px-1'
    )}
  >
    <div
      className={clsxm(
        'h-full',
        currentStepIndex === 2 && 'w-2/6 bg-success',
        currentStepIndex === 3 && 'w-4/6 bg-success',
        currentStepIndex === 4 && 'w-full bg-success'
      )}
    />
  </div>
);
