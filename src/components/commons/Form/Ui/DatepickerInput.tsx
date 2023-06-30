import pl from 'date-fns/locale/pl';
import useTranslation from 'next-translate/useTranslation';
import { useRef, useState } from 'react';
import DatePicker, { ReactDatePicker, registerLocale } from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import { clsxm } from '@/lib/clsxm';

import { Icon } from '@/components/commons/Icon/Icon';

export type DatePickerInputProps = {
  error?: string;
  value?: string;
  placeholder?: string;
  minYear?: number;
  isFutureDate?: boolean;
  showTimeInput?: boolean;
  handleChange: (dates: Date | [Date | null, Date | null] | null) => void;
  clearValue?: () => void;
};

const DatepickerInput = ({
  error,
  value,
  placeholder,
  isFutureDate = true,
  minYear,
  showTimeInput,
  clearValue,
  handleChange,
  ...props
}: DatePickerInputProps) => {
  const { t } = useTranslation('form');
  const inputCntRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<ReactDatePicker | null>(null);

  const [startDate, setStartDate] = useState<Date>(new Date());

  registerLocale('pl', pl);

  const handleInputCntClick = () => {
    inputRef?.current?.setOpen(true);
  };

  const maxDateHandler = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const newDate = new Date(year + 10, month, day);

    return isFutureDate ? newDate : date;
  };

  const minDateHandler = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const newDate = new Date(minYear ? year - minYear : year, month, day);

    return newDate;
  };

  const handleDateChange = (
    dates: Date | [Date | null, Date | null] | null
  ) => {
    if (!dates) return;

    if (dates instanceof Date) {
      setStartDate(dates);
      handleChange(dates);
    }
  };

  return (
    <div
      ref={inputCntRef}
      onClick={handleInputCntClick}
      className={clsxm(
        'flex h-12 cursor-pointer items-center rounded-xs border border-cloud px-4',
        error && 'border-error'
      )}
    >
      <Icon name='calendar' className='fill-current text-gray' />
      <DatePicker
        {...{ ...props, value }}
        locale='pl'
        ref={inputRef}
        calendarClassName='custom_calendar'
        className='h-full w-full border-none'
        wrapperClassName='w-full'
        minDate={minDateHandler()}
        maxDate={maxDateHandler()}
        focusSelectedMonth
        placeholderText={placeholder ? t(`label.${placeholder}`) : ''}
        onChange={handleDateChange}
        showMonthDropdown
        showYearDropdown
        dropdownMode='select'
        selected={startDate}
        showTimeInput={showTimeInput}
        timeInputLabel={showTimeInput ? t('label.time') : undefined}
      />
      {clearValue ? (
        <button
          type='button'
          onClick={() => {
            clearValue();
            setStartDate(new Date());
          }}
        >
          <Icon
            name='close-modal'
            className={clsxm(
              'w-2.5',
              value ? 'visible cursor-pointer' : 'invisible'
            )}
          />
        </button>
      ) : null}
    </div>
  );
};

export default DatepickerInput;
