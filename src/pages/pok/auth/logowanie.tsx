import { Layout } from '@/components/Layouts/Auth/Layout';
import { Login } from '@/components/Pok/Auth/Login';

const LoginPage = () => (
  <Layout title='login.pok.title' content='login.pok.content'>
    <Login />
  </Layout>
);

export default LoginPage;
