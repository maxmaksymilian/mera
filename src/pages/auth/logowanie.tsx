import { Layout } from '@/components/Layouts/Auth/Layout';
import { Login } from '@/components/panel/Auth/Login';

const LoginPage = () => (
  <Layout title='login.title' content='login.content'>
    <Login />
  </Layout>
);

export default LoginPage;
