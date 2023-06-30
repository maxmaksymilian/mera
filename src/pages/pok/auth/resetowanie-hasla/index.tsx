import { useState } from 'react';

import { Layout } from '@/components/Layouts/Auth/Layout';
import { ResetPassword } from '@/components/Pok/Auth/ResetPassword/ResetPassword';

const ResetPasswordPage = () => {
  const [isSubmited, setIsSubmited] = useState<boolean>(false);

  return (
    <Layout
      title='resetPassword.title'
      content={isSubmited ? '' : `resetPassword.content`}
    >
      <ResetPassword
        {...{ isSubmited, setIsSubmited: () => setIsSubmited(true) }}
      />
    </Layout>
  );
};

export default ResetPasswordPage;
