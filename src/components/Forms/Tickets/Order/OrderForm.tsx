import useTranslation from 'next-translate/useTranslation';

import { clsxm } from '@/lib';
import { Without } from '@/lib/api';
import { UseApiQueryProps } from '@/hooks/api/useApiQuery';

import { Form } from '@/components/commons/Form/Form';
import { ProgressBar } from '@/components/commons/Form/ProgressBar/ProgressBar';
import { FormProps } from '@/components/Forms/@types/Form';

import { ClientInfo } from './components/ClientInfo/ClientInfo';
import { SideBar } from './components/SideBar/SideBar';
import { steps } from './OrderFormModel';
import { stepsPok } from './OrderFormModel';
import { useOrderForm } from './useOrderForm';

export type OrderFormProps = {
  cardId?: string;
  profileName?: string;
  ticketsQuery: UseApiQueryProps;
} & Without<FormProps, 'method'>;

export const OrderForm = ({
  access,
  profileName,
  ...props
}: OrderFormProps) => {
  const { t } = useTranslation('common');
  const { step, setStep, stepComponents, form, isLoading, errors } =
    useOrderForm({ access, profileName, ...props });

  return (
    <Form {...{ form, className: 'mb-4 px-0' }}>
      <h1 className='py-8 text-md font-normal leading-8 md:hidden'>
        {t('buyTicketsLabel')}
      </h1>
      <ProgressBar
        {...{
          steps: access === 'admin' ? stepsPok : steps,
          step,
          startIndex: 0,
          className: clsxm(
            'md:max-w-[600px] mx-auto md:mb-8',
            access === 'admin' && 'md:max-w-[800px]'
          ),
        }}
      />
      {access === 'admin' ? (
        <ClientInfo step={step} profileName={profileName} />
      ) : null}
      <div className='flex flex-col flex-nowrap md:flex-row md:gap-8'>
        <div className='md:min-w-[calc(100%_-_332px)] lg:min-w-[calc(100%_-_432px)]'>
          {stepComponents[step]}
        </div>
        <SideBar
          {...{
            ...props,
            isLoading,
            errors,
            step,
            handleBack: () => setStep((prev) => prev - 1),
          }}
        />
      </div>
    </Form>
  );
};
