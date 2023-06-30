import { FormikContextType, FormikValues, useFormikContext } from 'formik';
import useTranslation from 'next-translate/useTranslation';

import { MyUserCard } from '@/components/panel/MyUsers/UserDetails/MyUserCard';

export const Summary = () => {
  const { t } = useTranslation('common');
  const { values }: FormikContextType<FormikValues> = useFormikContext();
  const {
    first_name,
    last_name,
    pesel,
    email,
    telephone,
    telephone_prefix,
    birthday_date,
  } = values;

  return (
    <div className='mx-auto'>
      <p className='block pb-10 font-bold md:hidden'>{t('userCreated')}</p>
      <p className='block text-sm md:hidden'>
        {first_name} {last_name}
      </p>
      <MyUserCard
        {...{
          first_name,
          last_name,
          pesel,
          email,
          birthday_date,
          telephone: { telephone, prefix: telephone_prefix },
          isStepThree: true,
        }}
      />
    </div>
  );
};
