import useTranslation from 'next-translate/useTranslation';

import { convertDate } from '@/lib/helpers';
import { useScreen } from '@/hooks/useScreen';

import { Button } from '@/components/commons/Button';
import { CaseInfoElement } from '@/components/panel/MyCases/CaseDetails/components/CaseInfoElement';

type CaseDetailsDescriptionProps = {
  data: any;
  setIsOpen: (val: boolean) => void;
};

export const CaseDetailsDescription = ({
  data,
  setIsOpen,
}: CaseDetailsDescriptionProps) => {
  const { t } = useTranslation('common');
  const { isMdUp } = useScreen();

  return (
    <div>
      {isMdUp ? (
        <div className='hidden items-center justify-between py-10 md:flex'>
          <div className='case-info flex gap-x-16'>
            <CaseInfoElement
              label={t('caseStartDate')}
              content={convertDate(data.created_at, true)}
            />
            <CaseInfoElement
              label={t('updated')}
              content={convertDate(data.updated_at, true)}
            />
            <CaseInfoElement label='Status' content={data.status} isStatus />
            <CaseInfoElement label={t('caseType')} content='Reklamacja' />
            {data.status === 'closed' && data.ended_at ? (
              <CaseInfoElement
                label={t('caseEndDate')}
                content={data.status === 'closed' ? `${data.ended_at}` : ''}
              />
            ) : null}
            <CaseInfoElement label='Opiekun' content='Jan Kowalski' />
          </div>
          {data.status === 'closed' && (
            <Button variant='secondary' handleClick={() => setIsOpen(true)}>
              {t('caseReopen')}
            </Button>
          )}
        </div>
      ) : (
        <div className='mobile-details'>
          <div className='flex justify-between py-1.5'>
            <p className='w-1/2 text-sm leading-8 text-gray'>
              {t('notificationDate')}
            </p>
            <p className='w-1/2 text-sm leading-8 text-black'>
              {convertDate(data.created_at)}
            </p>
          </div>
          <div className='flex justify-between py-1.5'>
            <p className='w-1/2 text-sm leading-8 text-gray'>{t('updated')}</p>
            <p className='w-1/2 text-sm leading-8 text-black'>
              {convertDate(data.updated_at)}
            </p>
          </div>
          <div className='flex justify-between py-1.5'>
            <p className='w-1/2 text-sm leading-8 text-gray'>{t('type')}</p>
            <p className='w-1/2 text-sm leading-8 text-black'>
              {t('complaint')}
            </p>
          </div>
          <div className='flex justify-between py-1.5'>
            <p className='w-1/2 text-sm leading-8 text-gray'>{t('status')}</p>
            <p className='w-1/2 text-sm leading-8 text-black'>
              {t('inProgress')}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
