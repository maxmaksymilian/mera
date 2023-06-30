import { clsxm } from '@/lib';

import { Line } from './components/Line';
import { Step } from './components/Step';

export type ProgressBarSectionProps = {
  startIndex: number;
  step: number;
  steps: string[];
  className?: string;
};

export const ProgressBar = ({
  startIndex,
  step,
  steps,
  className,
}: ProgressBarSectionProps) => {
  const activeStep = step + startIndex;
  const stepsLength = steps.length - 1 - startIndex;

  return (
    <div className={clsxm(`py-4 md:px-7 md:pt-8 md:pb-16`, className)}>
      <div className='relative flex flex-col justify-between md:flex-row'>
        {steps.map((label, index) => (
          <Step
            key={label}
            isActive={index <= activeStep}
            isPulsing={index === activeStep}
            {...{ activeStep, stepsLength, label }}
          />
        ))}
        <Line {...{ activeStep, stepsLength }} />
      </div>
    </div>
  );
};
