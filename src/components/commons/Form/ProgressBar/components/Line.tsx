import { clsxm } from '@/lib';

export type LineProps = { activeStep: number; stepsLength: number };

export const Line = ({ activeStep, stepsLength }: LineProps) => (
  <div className='z-1 h-5 w-full bg-cloud md:absolute md:top-1/2 md:h-[3px] md:-translate-y-1/2 md:px-1'>
    <div
      className={clsxm(
        'hidden h-full md:block',
        activeStep > 0 && `md:w-${activeStep}/${stepsLength} bg-success`
      )}
    />
    <div
      className='h-full bg-success md:hidden'
      style={{
        width: `${Math.floor(((activeStep + 1) / (stepsLength + 1)) * 100)}%`,
      }}
    ></div>
  </div>
);
