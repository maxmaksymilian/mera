import { FormikContextType, FormikValues } from 'formik';
import { useState } from 'react';

import { SortType } from '@/components/commons/List/@types/List';

export const useTable = ({
  form,
}: {
  form?: FormikContextType<FormikValues>;
}) => {
  const [activeKey, setActiveKey] = useState<SortType>({
    orderBy: '',
    order: 'asc',
  });

  const sortHandler = (key: string) => {
    const newOrder =
      activeKey.orderBy === key && activeKey.order === 'asc' ? 'desc' : 'asc';
    setActiveKey({ orderBy: key, order: newOrder });
    if (form) {
      form.setFieldValue("['sort[field]']", key);
      form.setFieldValue("['sort[dir]']", newOrder);
    }
  };

  return { activeKey, sortHandler };
};
