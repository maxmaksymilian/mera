import useTranslation from 'next-translate/useTranslation';
import { useEffect, useState } from 'react';

import { clsxm } from '@/lib';
import { useScreen } from '@/hooks/useScreen';

import {
  ProgressBarLine,
  ProgressBarStep,
} from '@/components/Layouts/Panel/components/Wizard';

export type ProgressBarSectionProps = {
  currentStepIndex: number;
  stepsCount: number;
  steps: string[];
};

export const ProgressBarSection = ({
  currentStepIndex,
  steps,
  stepsCount,
}: ProgressBarSectionProps) => {
  const { t } = useTranslation('wizard');
  const [progress, setProgress] = useState<number>(0);
  const { isMdUp } = useScreen();

  const progressCounter = () => {
    const progressSteps = stepsCount - 2;
    const percent = (currentStepIndex / progressSteps) * 100;
    setProgress(percent);
  };

  useEffect(() => {
    progressCounter();
  }, [currentStepIndex]);

  return isMdUp ? (
    <div className='px-7 pt-8 pb-16'>
      <div className='relative flex justify-between'>
        {steps.map((label, index) => (
          <div key={index} className='relative'>
            <ProgressBarStep
              key={label}
              isActive={index < currentStepIndex}
              isPulsing={index === currentStepIndex - 1}
            />
            <p
              className={clsxm(
                'absolute left-1/2 -translate-x-1/2 whitespace-nowrap pt-1 text-sm leading-4 text-gray',
                index === currentStepIndex - 1 && 'font-bold text-black'
              )}
            >
              {t(`progressBarSteps.${index}`)}
            </p>
          </div>
        ))}
        <ProgressBarLine currentStepIndex={currentStepIndex} />
      </div>
    </div>
  ) : (
    <div className='py-4'>
      <p className='pb-4'>
        {t('progressBarSection.stepLabel')} {currentStepIndex} /{' '}
        {stepsCount - 2}:&nbsp;
        {steps[currentStepIndex - 1]}
      </p>
      <div className='h-5 w-full bg-cloud'>
        <div
          className='progressbar h-full bg-success'
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};
