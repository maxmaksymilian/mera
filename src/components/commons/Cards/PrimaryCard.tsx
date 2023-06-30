import useTranslation from 'next-translate/useTranslation';

import { Without } from '@/lib/api';

import { Button } from '@/components/commons/Button';
import { Link } from '@/components/commons/Link';
import {
  ListHeaderType,
  ListRecordType,
} from '@/components/commons/List/@types/List';
import { useTableRecord } from '@/components/commons/List/components/Table/components/TableRecord/useTableRecord';

export type TableRecordProps = {
  headers: ListHeaderType[];
} & ListRecordType;

export const PrimaryCard = ({
  cardData,
  ...props
}: Without<TableRecordProps, 'link'>) => {
  const { t } = useTranslation('list');
  const { transformedRecordMobile, renderColumn } = useTableRecord(props);

  return (
    <div>
      {cardData?.title ? (
        <p className='pb-4 text-sm leading-6 text-black'>{cardData.title}</p>
      ) : null}
      {transformedRecordMobile.map(({ value, type, key, customLabel }) => (
        <div key={key} className='flex gap-2.5 pb-2'>
          <div className='w-1/2 text-sm leading-8 text-gray'>
            {t(`header.${customLabel || key}`)}
          </div>
          <div className='w-1/2 text-sm leading-8 text-black'>
            {renderColumn({ value, type })}
          </div>
        </div>
      ))}
      {cardData?.linkButton?.link ? (
        <Link href={cardData.linkButton.link}>
          <Button variant='secondary' fullWidth className='my-5 h-12'>
            {t(`button.${cardData.linkButton.content}`)}
          </Button>
        </Link>
      ) : null}
    </div>
  );
};
