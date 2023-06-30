import useTranslation from 'next-translate/useTranslation';

import { clsxm } from '@/lib';

export type StepProps = {
  isPulsing?: boolean;
  isActive?: boolean;
  label: string;
  activeStep: number;
  stepsLength: number;
};

export const Step = ({
  isPulsing,
  isActive,
  label,
  activeStep,
  stepsLength,
}: StepProps) => {
  const { t } = useTranslation('form');

  return (
    <div className={clsxm(`relative`, !isPulsing && 'hidden md:block')}>
      <div className='relative z-10 flex'>
        <div
          className={clsxm(
            'pulse-success box-content hidden h-10 w-10 rounded-full border-8 border-white bg-cloud md:block',
            isActive && 'bg-success',
            isPulsing && 'animate-pulse-progress-bar-success'
          )}
        >
          &nbsp;
        </div>
      </div>
      <p
        className={clsxm(
          'whitespace-nowrap pb-4 md:absolute md:left-1/2 md:-translate-x-1/2 md:pb-0 md:pt-1 md:text-sm md:leading-4 md:text-gray'
        )}
      >
        <span className='md:hidden'>
          {t(`steps.step`)} {activeStep + 1} / {stepsLength + 1}:{' '}
          {t(`steps.label.${label}`)}
        </span>
        <span
          className={clsxm(
            'hidden md:inline-block',
            isActive && 'font-bold text-black'
          )}
        >
          {t(`steps.label.${label}`)}
        </span>
      </p>
    </div>
  );
};
