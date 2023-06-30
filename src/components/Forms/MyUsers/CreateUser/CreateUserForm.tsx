import useTranslation from 'next-translate/useTranslation';

import { Button } from '@/components/commons/Button';
import { SubmitButton } from '@/components/commons/Form/Fields/SubmitButton';
import { Form } from '@/components/commons/Form/Form';
import { ProgressBar } from '@/components/commons/Form/ProgressBar/ProgressBar';
import { FormProps } from '@/components/Forms/@types/Form';

import { stepsData } from './CreateUserFormModel';
import { useCreateUserForm } from './useCreateUserForm';

export type CreateUserFormProps = {
  handleClose: () => void;
} & FormProps;

//TODO fixed translations

export const CreateUserForm = (props: CreateUserFormProps) => {
  const { t } = useTranslation('common');
  const { form, step, setStep, isLoading, stepComponent } =
    useCreateUserForm(props);
  const { handleClose } = props;
  const { title, content } = stepsData[step];

  return (
    <Form {...{ form }}>
      <div className='w-full max-w-6xl px-11 py-10 lg:w-lg'>
        <h1 className='text-3xl font-normal leading-9 text-black'>{title}</h1>
        <h2 className='mt-4 text-base font-normal leading-6 text-gray'>
          {content}
        </h2>
        <ProgressBar
          steps={stepsData.map(({ header }) => header)}
          startIndex={0}
          step={step}
        />
        {stepComponent[step]}
        <div className='flex flex-col-reverse justify-center gap-7 pt-0 md:flex-row md:pt-14'>
          {step < 2 ? (
            <>
              <Button
                type='button'
                variant='secondary'
                rounded
                handleClick={() =>
                  step === 1 ? setStep((prev) => prev - 1) : handleClose()
                }
              >
                {step === 1 ? t('back') : t('cancel')}
              </Button>
              <SubmitButton
                loading={isLoading}
                label={step === 1 ? 'createUser' : 'goNext'}
              />
            </>
          ) : (
            <>
              <Button
                className='hidden md:block'
                type='button'
                variant='primary'
                rounded
                handleClick={handleClose}
              >
                {t('close')}
              </Button>
              <Button
                className='mx-9 block text-sm md:hidden'
                type='button'
                variant='primary'
                rounded
                handleClick={handleClose}
              >
                {t('goToUserList')}
              </Button>
            </>
          )}
        </div>
      </div>
    </Form>
  );
};
