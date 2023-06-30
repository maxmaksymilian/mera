import useTranslation from 'next-translate/useTranslation';

import { clsxm } from '@/lib';

import {
  CreateCardForm,
  CreateCardFormProps,
} from '@/components/Forms/MyCards/CreateCard/CreateCardForm';

export const AddCardModal = (props: CreateCardFormProps) => {
  const { t } = useTranslation('common');
  return (
    <div className='min-h-sm w-full px-9 py-10 md:w-md md:px-11 lg:w-md'>
      <div>
        <h1
          className={clsxm(
            'pb-7 text-md font-normal leading-8 text-black',
            'md:pb-3 md:text-lg md:leading-lg'
          )}
        >
          {t('addNewCard')}
        </h1>
        <p className='text-sm leading-6 text-gray md:text-base md:leading-6'>
          {t('addNewDataCarrierInfo')}
        </p>
      </div>
      <CreateCardForm {...props} />
    </div>
  );
};
