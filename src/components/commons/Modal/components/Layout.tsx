import useTranslation from 'next-translate/useTranslation';

import { clsxm } from '@/lib';

import { Button } from '@/components/commons/Button';

type ApprovalBtns =
  | 'goPayment'
  | 'buttonSaveChanges'
  | 'close'
  | 'makeCase'
  | 'caseReopen'
  | 'deleteAcc'
  | 'makeStandaloneAcc'
  | 'setNewPass'
  | 'buttonRemoveCard'
  | 'buttonBuyTicket'
  | 'createCardBtn'
  | 'completeAccountBtn'
  | 'buttonMyTickets'
  | 'goToLoginPage';

type DenialBtns = 'cancel' | 'close';

export type LayoutProps = {
  headline: string;
  subHeadline?: string;
  isApprovalBtn?: boolean;
  isDenialBtn?: boolean;
  approvalBtnText?: ApprovalBtns;
  denialBtnText?: DenialBtns;
  width?: 'default' | 'wide' | 'wider' | 'widest';
  className?: string;
  children?: React.ReactNode;
};

export const Layout = ({
  headline,
  subHeadline,
  isApprovalBtn,
  isDenialBtn,
  approvalBtnText = 'close',
  denialBtnText = 'cancel',
  width,
  className,
  children,
}: LayoutProps) => {
  const { t } = useTranslation('common');

  const widthMap = {
    default: 'md:w-md',
    wide: 'md:w-md',
    wider: '',
    widest: '',
  };

  return (
    <div
      className={clsxm(
        'min-h-sm w-full px-9 py-10 md:px-11',
        width && widthMap[width],
        className
      )}
    >
      <div>
        <h1
          className={clsxm(
            'pb-7 text-md font-normal leading-8 text-black',
            'md:pb-3 md:text-lg md:leading-lg'
          )}
        >
          {t(headline)}
        </h1>
        {subHeadline && (
          <p className='text-sm leading-6 text-gray md:text-base md:leading-6'>
            {t(subHeadline)}
          </p>
        )}
      </div>
      <div>{children}</div>
      <div className='flex items-center justify-center gap-2.5'>
        {isDenialBtn && <Button variant='secondary'>{t(denialBtnText)}</Button>}
        {isApprovalBtn && <Button>{t(approvalBtnText)}</Button>}
      </div>
    </div>
  );
};
