import useTranslation from 'next-translate/useTranslation';

import { Button } from '@/components/commons/Button';
import { SubmitButton } from '@/components/commons/Form/Fields/SubmitButton';
import { FormMessage } from '@/components/commons/Form/FormMessage';

import { Ticket } from './components/Ticket';
import { useSideBar } from './useSideBar';

type SideBarProps = {
  isLoading: boolean;
  errors?: { [key: string]: string };
  step: number;
  isPok?: boolean;
  handleBack: () => void;
};

export const SideBar = ({
  isLoading,
  errors,
  step,
  isPok,
  handleBack,
}: SideBarProps) => {
  const { t } = useTranslation('common');
  const { values, summaryPrice, tickets, removeTicket, countTicket } =
    useSideBar();

  return (
    <div className='sticky bottom-0 left-0 w-full bg-white md:relative md:min-w-[300px] lg:min-w-[400px]'>
      <p className='hidden text-2xl font-bold md:block'>{t('yourOrder')}</p>
      {tickets.map((item) => (
        <Ticket
          key={item.id}
          {...{
            ...item,
            count: countTicket(item.id),
            handleRemove: () => removeTicket(item.id),
          }}
        />
      ))}
      <div className='mt-6 mb-7 h-[1px] w-full bg-cloud' />
      <div className='flex justify-between md:block'>
        <div className='mb-7 block md:flex md:justify-between'>
          <p>{t('toPay')}</p>
          <p>{summaryPrice} zł</p>
        </div>
        <SubmitButton
          {...{
            label: 'goFurther',
            loading: isLoading,
            variant:
              values.card !== '' && values.item.length > 0
                ? 'primary'
                : 'disabled',
            className: 'w-1/2 md:w-full',
            fullWidth: true,
          }}
        />
      </div>
      {step === 1 || (isPok && step === 2) ? (
        <div className='mt-4'>
          <Button fullWidth variant='quaternary' handleClick={handleBack}>
            {t('backToTickets')}
          </Button>
        </div>
      ) : null}
      <FormMessage {...{ type: 'error', params: errors, prefix: 'order' }} />
    </div>
  );
};
