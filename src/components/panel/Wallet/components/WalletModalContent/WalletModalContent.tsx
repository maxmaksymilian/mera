import { CurrencyInput } from '@/components/commons/Form/Fields/CurrencyInput';
import { SubmitButton } from '@/components/commons/Form/Fields/SubmitButton';
import { Form } from '@/components/commons/Form/Form';
import { FormMessage } from '@/components/commons/Form/FormMessage';
import { Layout } from '@/components/commons/Modal/components/Layout';

import { useWalletModalContentForm } from './useWalletModalContentForm';

type WalletModalContentProps = {
  points?: number;
};

export const WalletModalContent = ({ points = 0 }: WalletModalContentProps) => {
  const { error, form, isLoading, t } = useWalletModalContentForm();

  return (
    <Layout
      headline='panel.wallet.walletModalHeadline'
      subHeadline='panel.wallet.walletModalSubHeadline'
      width='default'
    >
      <div className='py-10'>
        <p className='text-base leading-6 text-gray'>
          {t('panel.wallet.personalBalance')}
        </p>
        <p className='py-2.5 font-bold md:text-lg md:leading-lg'>
          {t('panel.wallet.personalBalancePoints', { points })}
        </p>
      </div>
      <div>
        <Form {...{ form }}>
          <div className='items-start gap-10 md:grid md:grid-cols-2'>
            <div className='relative pb-10 md:pb-0'>
              <CurrencyInput name='value' />
            </div>
            <div className='flex items-center gap-5'>
              <p className='text-base leading-6 text-gray'>
                {t('panel.wallet.youWillGet')}:
              </p>
              <p className='text-lg font-bold leading-normal'>
                {form.values.value || '0'} {t('panel.wallet.points')}
              </p>
            </div>
          </div>
          <p className='pt-10 text-gray'>{t('panel.wallet.walletModalInfo')}</p>
          <div className='flex justify-center py-10'>
            <SubmitButton label='goPayment' loading={isLoading} />
          </div>
        </Form>
        {error && <FormMessage type='error' content={error.toString()} />}
      </div>
    </Layout>
  );
};
