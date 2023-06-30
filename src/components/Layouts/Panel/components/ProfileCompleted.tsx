import useTranslation from 'next-translate/useTranslation';

import { useAppStore } from '@/lib';

import { Button } from '@/components/commons/Button';
import { Icon } from '@/components/commons/Icon/Icon';
import { Modal } from '@/components/commons/Modal/Modal';

import { Wizard } from './Wizard';

export const ProfileCompleted = () => {
  const { t } = useTranslation('common');
  const {
    personalData: { profile_completed },
    isIntroWizardOpen,
    setIntroWizard,
  } = useAppStore();

  return (
    <>
      {!profile_completed && (
        <div className='mb-8 flex items-center justify-center gap-8 rounded-xs bg-lightgray bg-opacity-20 p-6 md:mb-0 md:mt-0 md:flex md:p-8'>
          <div className='m-auto md:m-0'>
            <Icon name='info' />
          </div>
          <div className='m-auto grid w-full items-center justify-between md:flex md:w-[calc(100%_-_89px)]'>
            <div className='flex-col gap-2'>
              <p className='text-base font-bold md:text-2xl'>
                {t('incompleteAccountLabel')}
              </p>
              <p className='mt-5 mb-8 text-sm text-gray md:mt-0 md:mb-0 md:text-base'>
                {t('incompleteAccountInfo')}
              </p>
            </div>
            <Button handleClick={() => setIntroWizard(true)}>
              <p className='text-sm md:text-base'>{t('completeDataBtn')}</p>
            </Button>
          </div>
        </div>
      )}
      {isIntroWizardOpen ? (
        <Modal
          handleClose={() => setIntroWizard(false)}
          isOpen={isIntroWizardOpen}
        >
          <Wizard handleClose={() => setIntroWizard(false)} />
        </Modal>
      ) : null}
    </>
  );
};
