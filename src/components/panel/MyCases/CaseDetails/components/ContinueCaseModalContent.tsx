import useTranslation from 'next-translate/useTranslation';

import { Button } from '@/components/commons/Button';
export type ContinueCaseModalContentProps = {
  headline: string;
  content: string;
  handleClose: () => void;
  handleSubmit: () => void;
};

export const ContinueCaseModalContent = ({
  headline,
  content,
  handleClose,
  handleSubmit,
}: ContinueCaseModalContentProps) => {
  const { t } = useTranslation('common');
  return (
    <div className='w-full py-8 px-10 lg:w-md'>
      <h1 className='text-lg font-normal leading-lg text-black'>{headline}</h1>
      <p className='py-7 pb-12 text-base leading-6 text-gray'>{content}</p>
      <div className='flex items-center justify-center gap-2.5'>
        <Button variant='secondary' handleClick={handleClose}>
          {t('cancel')}
        </Button>
        <Button type='submit' handleClick={handleSubmit}>
          {t('caseReopen')}
        </Button>
      </div>
    </div>
  );
};
