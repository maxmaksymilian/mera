import useTranslation from 'next-translate/useTranslation';

import { Register } from '@/components/panel/Auth/Register';

const RegisterPage = () => {
  const { t } = useTranslation('common');

  return (
    <Register
      title={t('auth.register.title')}
      content={t('auth.register.content')}
    />
  );
};

export default RegisterPage;
