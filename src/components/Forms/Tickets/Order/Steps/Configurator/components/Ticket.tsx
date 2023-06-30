import useTranslation from 'next-translate/useTranslation';

import { TicketType } from '@/components/commons/Cards/OrderTicketCard';
import DatepickerInput, {
  DatePickerInputProps,
} from '@/components/commons/Form/Ui/DatepickerInput';

type TicketProps = { expire_date: string } & TicketType &
  Pick<DatePickerInputProps, 'handleChange'>;

export const Ticket = ({
  name,
  activation_date,
  expire_date,
  handleChange,
}: TicketProps) => {
  const { t } = useTranslation('common');

  return (
    <div className='mt-10'>
      <p className='font-bold'>{name}</p>
      <div className='block md:flex md:flex-col'>
        <div className='mt-5 flex min-w-full flex-col md:min-w-xs md:flex-row'>
          <p className='mr-20'>{t('choseActivationDate')}</p>
          <p className='hidden md:block'>{t('ticketExpDate')}:</p>
        </div>
        <div className='mt-2 flex flex-col md:flex-row'>
          <div className='mr-0 min-w-full text-gray md:mr-8 md:min-w-xs'>
            <DatepickerInput
              handleChange={handleChange}
              value={activation_date}
              showTimeInput
            />
          </div>
          <div className='mt-5 min-w-full rounded-xs bg-cloud py-5 text-center md:mt-0 md:min-w-xs md:rounded-none md:py-0 md:text-start'>
            <p className='text-sm md:hidden'>
              {t('pages.tickets.expirationTo')}
            </p>
            <p className='py-3 pl-0 font-bold md:pl-20'>{expire_date}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
