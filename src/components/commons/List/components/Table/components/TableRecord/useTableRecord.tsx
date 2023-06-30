import useTranslation from 'next-translate/useTranslation';

import { Without } from '@/lib/api';
import { convertDate, priceHandler } from '@/lib/helpers';

import { Link } from '@/components/commons/Link';
import { HeaderTypes } from '@/components/commons/List/@types/List';
import { Status } from '@/components/commons/Status';

import { Details } from './components/Details';
import { TableRecordProps } from './TableRecord';

export const useTableRecord = ({
  headers,
  data,
}: Without<TableRecordProps, 'link' | 'actions'>) => {
  const { t } = useTranslation('list');

  const valueHandler = (
    value: string | number,
    type: (typeof HeaderTypes)[number]
  ): string => {
    switch (type) {
      case 'DATE':
        return convertDate(value.toString());
      case 'DATE_TIME':
        return convertDate(value.toString(), true);
      case 'CONTENT':
        return value.toString();
      case 'PRICE':
        return `${priceHandler(Number(value))} ${t('common.currency')}`;
      default:
        return value?.toString() || t('common.empty');
    }
  };

  const transformedRecord = headers.reduce(
    (prev: any[], { key, type, ...current }: any) => [
      ...prev,
      {
        ...current,
        key,
        value: {
          value: Object.keys(data).includes(key)
            ? valueHandler(data[key].value, type)
            : t('common.empty'),
          properties: Object.keys(data).includes(key)
            ? data[key].properties
            : t('common.empty'),
        },
        hideOnMobile: Object.keys(data).includes(key)
          ? data[key].hideOnMobile
          : false,
        type,
      },
    ],
    []
  );

  const transformedRecordMobile: any[] = transformedRecord.filter(
    ({ hideOnMobile }) => !hideOnMobile
  );

  const renderColumn = ({
    value: { value, properties },
    type,
    className,
  }: {
    value: {
      value: string;
      properties: { [key: string]: string | number };
    };
    type: (typeof HeaderTypes)[number];
    className?: string;
  }) => {
    switch (type) {
      case 'LINK':
        return (
          <Link
            className={className}
            href={typeof properties.link === 'string' ? properties.link : '#'}
          >
            {value}
          </Link>
        );
      case 'STATUS':
        return <Status {...{ value }} />;
      case 'CONTENT':
        return <Details {...{ value, ...properties }} />;
      default:
        return value;
    }
  };

  return {
    t,
    valueHandler,
    transformedRecord,
    transformedRecordMobile,
    renderColumn,
  };
};
