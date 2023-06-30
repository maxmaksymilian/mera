import pl from 'date-fns/locale/pl';
import useTranslation from 'next-translate/useTranslation';
import React, { useRef, useState } from 'react';
import DatePicker, { ReactDatePicker, registerLocale } from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import { clsxm } from '@/lib';
import { convertDate } from '@/lib/helpers';

import { Icon } from '@/components/commons/Icon/Icon';

export type RangeDateType = {
  start: string;
  end: string;
};

export type DatePickerInputProps = {
  name: string;
  placeholder: string;
  label?: string;
  value?: string;
  error?: string;
  minYear?: number;
  isRange?: boolean;
  dateFormat?: string;
  isFutureDate?: boolean;
  setFieldValue: (
    field: string,
    value: string | RangeDateType,
    shouldValidate?: boolean
  ) => void;
  showTimeInput?: boolean;
};

export const DatePickerInput = ({
  label,
  name,
  placeholder,
  minYear,
  error,
  value,
  isRange,
  dateFormat,
  showTimeInput,
  isFutureDate = true,
  setFieldValue,
}: DatePickerInputProps) => {
  const { t } = useTranslation('form');
  const inputCntRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<ReactDatePicker | null>(null);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [rangeStartDate, setRangeStartDate] = useState<Date | null>(new Date());
  const [rangeEndDate, setRangeEndDate] = useState<Date | null>(new Date());

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
    dates: Date | [Date | null, Date | null] | null,
    isTime?: boolean
  ) => {
    if (!dates) return;

    if (Array.isArray(dates)) {
      const [start, end] = dates;
      setRangeStartDate(start);
      setRangeEndDate(end);
      setFieldValue(name, {
        start: convertDate(start || ''),
        end: convertDate(end || ''),
      });
    }

    if (dates instanceof Date) {
      setStartDate(dates);
      setFieldValue(
        name,
        convertDate(dates || '', showTimeInput ? true : false),
        false
      );
    }
  };

  return (
    <div
      ref={inputCntRef}
      className='cursor-pointer'
      onClick={handleInputCntClick}
    >
      {label ? <p className='pb-1.5'>{label}</p> : null}
      <div
        className={clsxm(
          'flex h-12 items-center rounded-xs border border-cloud px-4',
          error && 'border-error'
        )}
      >
        <Icon name='calendar' className='fill-current text-gray' />
        <DatePicker
          locale='pl'
          ref={inputRef}
          name={name}
          calendarClassName='custom_calendar'
          className='h-full w-full border-none'
          wrapperClassName='w-full'
          minDate={minDateHandler()}
          maxDate={maxDateHandler()}
          focusSelectedMonth
          placeholderText={placeholder}
          value={value}
          showMonthDropdown
          showYearDropdown
          dropdownMode='select'
          dateFormat={dateFormat}
          onChange={(dates) => {
            handleDateChange(dates);
          }}
          selectsRange={isRange ? true : undefined}
          selected={isRange ? rangeStartDate : startDate}
          startDate={isRange ? rangeStartDate : undefined}
          endDate={isRange ? rangeEndDate : undefined}
          showTimeInput={showTimeInput}
          timeInputLabel={showTimeInput ? t('label.time') : undefined}
        />
      </div>
      {error && <p className='text-xs text-error'>{error}</p>}
    </div>
  );
};
