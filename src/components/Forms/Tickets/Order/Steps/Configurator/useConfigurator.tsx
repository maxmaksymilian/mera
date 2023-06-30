import { FormikContextType, FormikValues, useFormikContext } from 'formik';

import { convertDate, getDateData } from '@/lib/helpers';

import { TicketType } from '@/components/commons/Cards/OrderTicketCard';

export const useConfigurator = () => {
  const { values, setFieldValue }: FormikContextType<FormikValues> =
    useFormikContext();

  const updateTicket = (
    itemIndex: number,
    value: Date | [Date | null, Date | null] | null
  ) => {
    if (!(value instanceof Date)) {
      return;
    }

    return setFieldValue('item', [
      ...values.item.map((item: TicketType, index: number) =>
        itemIndex === index
          ? { ...item, activation_date: convertDate(value, true) }
          : item
      ),
    ]);
  };

  const getExpirationDate = (activation_date: string, validity: number) => {
    if (activation_date === '') {
      return '';
    }
    const { year, month, day, hours, minutes } = getDateData(activation_date, {
      days: validity,
    });

    return `${day.toString().padStart(2, '0')}-${month
      .toString()
      .padStart(2, '0')}-${year} ${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`;
  };

  return { values, updateTicket, getExpirationDate };
};
