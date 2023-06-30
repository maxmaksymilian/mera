import useTranslation from 'next-translate/useTranslation';
import { Dispatch } from 'react';

import { clsxm, useAppStore } from '@/lib';
import { ActionType } from '@/hooks/useMultiStepForm';

import { Button } from '@/components/commons/Button';
import { Spinner } from '@/components/commons/Spinner';
import { ProgressBarSection } from '@/components/Layouts/Panel/components/Wizard';
import { progressBarSteps } from '@/components/Layouts/Panel/components/Wizard/const';

export type WizardStepLayoutProps = {
  currentStepIndex: number;
  headline: string;
  subHeadline: string;
  stepsCount: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  isLoading?: boolean;
  isValid?: boolean;
  handleClose: () => void;
  dispatch: Dispatch<ActionType>;
  children: React.ReactNode;
};

export const WizardStepLayout = ({
  currentStepIndex,
  stepsCount,
  isFirstStep,
  isLastStep,
  isLoading,
  dispatch,
  handleClose,
  children,
}: WizardStepLayoutProps) => {
  const { t } = useTranslation('wizard');
  const {
    personalData: {
      profile: { first_name },
    },
  } = useAppStore();

  const nextButtonTextHandler = () => {
    if (isFirstStep) return t('wizardStepLayout.firstStepBtnLabel');
    if (isLastStep) return t('wizardStepLayout.lastStepBtnLabel');
    if (currentStepIndex === 4)
      return t('wizardStepLayout.verificationBtnLabel');
    else return t('wizardStepLayout.nextStepBtnLabel');
  };

  return (
    <div
      className={clsxm(
        'w-full max-w-6xl px-9 py-10 md:px-14 lg:w-lg',
        isFirstStep && 'max-w-4xl px-9 md:p-11',
        currentStepIndex === stepsCount - 1 && 'max-w-2xl px-14 py-10'
      )}
    >
      {isFirstStep && (
        <h1 className='text-md font-normal leading-lg md:text-lg'>
          {t('wizardStepLayout.welcomeLabel')} {first_name}!
        </h1>
      )}
      <div className='flex flex-col pb-5 md:block md:pb-0'>
        <div className='order-2 md:order-1'>
          <h1
            className={clsxm(
              'font-normal',
              isFirstStep
                ? 'py-5 text-sm leading-6 text-gray md:text-base'
                : 'py-3 text-md leading-8 text-black md:text-3xl md:leading-9'
            )}
          >
            {t(`stepsDataDesc.${currentStepIndex}.headline`)}
          </h1>
          <h2
            className={clsxm(
              'text-sm font-normal leading-6 text-gray md:text-base',
              isFirstStep && 'tex-base text-black'
            )}
          >
            {t(`stepsDataDesc.${currentStepIndex}.subHeadline`)}
          </h2>
        </div>
        <div className='order-1 md:order-2'>
          {isFirstStep || isLastStep ? null : (
            <ProgressBarSection
              steps={progressBarSteps}
              currentStepIndex={currentStepIndex}
              stepsCount={stepsCount}
            />
          )}
        </div>
      </div>
      {children}
      <div className='flex flex-col-reverse justify-center gap-2.5 pt-6 md:flex-row md:gap-7 md:pt-14'>
        {currentStepIndex !== stepsCount - 1 && (
          <Button
            type='button'
            variant='secondary'
            rounded
            handleClick={() => {
              isFirstStep ? handleClose() : dispatch({ type: 'PREV' });
            }}
          >
            {isFirstStep
              ? t('wizardStepLayout.laterBtnLabel')
              : t('wizardStepLayout.prevButtonLabel')}
          </Button>
        )}
        <Button
          variant='primary'
          type='submit'
          rounded
          handleClick={() => {
            isLastStep && handleClose();
          }}
        >
          {currentStepIndex < 4 ? (
            nextButtonTextHandler()
          ) : isLoading ? (
            <Spinner />
          ) : (
            t('wizardStepLayout.verificationBtnLabel')
          )}
        </Button>
      </div>
    </div>
  );
};
