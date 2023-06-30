import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

export type DataRecordProps = {
  label: string;
  value?:
    | string
    | {
        prefix: string;
        telephone: string;
      };
};

export const DataRecord = ({ label, value }: DataRecordProps) => {
  const { t } = useTranslation('common');
  const { asPath } = useRouter();
  return (
    <div className='flex justify-between pb-2 md:pb-0'>
      <p className='w-1/2 text-sm leading-6 text-gray md:text-base md:leading-9'>
        {t(label)}
      </p>
      <p className='w-1/2 text-sm leading-6 text-black md:text-base md:leading-9'>
        {typeof value === 'string'
          ? value
          : asPath.includes('pok') && label === 'phone' && value
          ? value?.prefix + ' ' + value?.telephone
          : ''}
      </p>
    </div>
  );
};
