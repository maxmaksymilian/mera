import useTranslation from 'next-translate/useTranslation';

type CaseInfoElementProps = {
  label: string;
  value: string;
};

export const CaseInfoElement = ({ label, value }: CaseInfoElementProps) => {
  const { t } = useTranslation('common');
  return (
    <div className='flex items-center justify-between py-1.5'>
      <p className='w-1/2 text-sm text-gray'>{t(label)}</p>
      <p className='w-1/2 text-sm'>{t(value)}</p>
    </div>
  );
};
