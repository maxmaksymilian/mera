import useTranslation from 'next-translate/useTranslation';

import { Checkbox } from '@/components/commons/Form/Fields/Checkbox';
import { SubmitButton } from '@/components/commons/Form/Fields/SubmitButton';
import { FormMessage } from '@/components/commons/Form/FormMessage';
import { Link } from '@/components/commons/Link';

export const Terms = ({
  errors,
  isLoading,
}: {
  errors?: { [key: string]: string };
  isLoading: boolean;
}) => {
  const { t } = useTranslation('form');

  return (
    <div className='w-full px-0 pt-0 md:px-9 lg:flex lg:w-1/2 lg:px-0 lg:pt-8'>
      <div className='w-full pl-0 lg:max-w-[620px] lg:pl-10'>
        <div className='mx-auto flex max-w-[620px] flex-col gap-5 pt-5 pb-5 lg:mx-0 lg:pt-0 lg:pb-0'>
          <h1 className='text-2xl font-normal md:text-lg'>
            {t('auth.register.formTermsTitle')}
          </h1>
          <label className='text-gray'>
            <Checkbox name='customAgreement1'>
              <span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
                <em className='text-error'> *</em>
              </span>
            </Checkbox>
          </label>
          <label className='text-gray'>
            <Checkbox name='customAgreement2'>
              <span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
                <em className='text-error'> *</em>
              </span>
            </Checkbox>
          </label>
          <label className='text-gray'>
            <Checkbox name='termsAgreement'>
              <div className='flex h-full items-center'>
                <p>
                  Zapoznałem się i akceptuję postanowienia
                  <em className='mx-1 inline-flex text-navy'>
                    <Link href='/regulamin'> regulaminu serwisu</Link>
                  </em>
                  <em className='text-error'> *</em>
                </p>
              </div>
            </Checkbox>
          </label>
          <SubmitButton label='createAccount' loading={isLoading} />
          <FormMessage type='error' params={errors} prefix='user' />
        </div>
      </div>
    </div>
  );
};
