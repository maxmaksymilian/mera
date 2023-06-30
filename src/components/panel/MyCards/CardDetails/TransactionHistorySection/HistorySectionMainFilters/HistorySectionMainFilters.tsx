import { useFormik } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import { useEffect, useState } from 'react';

import { Button } from '@/components/commons/Button';
import { CustomSelectInput } from '@/components/commons/CustomSelectInput';
import { DatePickerInput } from '@/components/commons/Fields/DatePickerInput';
import { SearchInput } from '@/components/commons/Fields/SearchInput';
import { Icon } from '@/components/commons/Icon/Icon';

import { ticketOptions } from './const';

export type FilterType = {
  date_from?: string;
  date_to?: string;
  search?: string;
  type?: string;
};

export const HistorySectionMainFilters = ({
  handleFilter,
}: {
  handleFilter: (values: FilterType) => void;
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { errors, values, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: {
        date_from: '',
        date_to: '',
        search: '',
        type: '',
      },
      onSubmit: (values) => handleFilter(values),
    });
  const { t } = useTranslation('common');

  const clearInput = () => {
    values.search = '';
  };

  useEffect(() => {
    handleSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  return (
    <>
      <form action='history-main-filters' onSubmit={handleSubmit}>
        <div className='md:hidden'>
          <Button
            variant='secondary'
            className='flex h-12 w-full items-center gap-5'
            handleClick={() => setIsModalOpen(true)}
          >
            <Icon name='sort' />
            {t('filter')}
          </Button>
        </div>
        <div className='hidden items-center gap-5 py-8 md:flex'>
          <div className='h-full w-72'>
            <SearchInput
              className='h-12'
              name='search'
              placeholder='Wyszukaj transakcje'
              handleChange={handleChange}
              value={values.search}
              clearInput={clearInput}
            />
          </div>
          <div className='w-48'>
            <CustomSelectInput
              name='type'
              className='pb-0'
              value={values.type}
              options={ticketOptions}
              placeholder='Rodzaj biletu'
              setFieldValue={setFieldValue}
            />
          </div>
          <div className='w-72'>
            <DatePickerInput
              name='date_from'
              minYear={10}
              placeholder='Wybierz datę'
              value={values.date_from}
              error={errors?.date_from}
              setFieldValue={setFieldValue}
            />
          </div>
        </div>
      </form>
    </>
  );
};
