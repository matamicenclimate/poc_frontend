import { Button } from '@/componentes/Elements/Button/Button';
import { Form } from '@/componentes/Form/Form';
import { Input } from '@/componentes/Form/Inputs';
import { LoginLayout } from '@/componentes/Layout/LoginLayout';
import { useAuth } from '@/lib/auth';
import { useTranslation } from 'react-i18next';
import { Link } from '@/componentes/Elements/Link/Link';

export const Login = () => {
  const auth = useAuth();
  const { t } = useTranslation();

  const handleLogin = async (data: { email: string }) => {
    await auth.login({ email: data.email });
  };

  return (
    <LoginLayout title={t('auth.Login.pageTitle')}>
      <div>
        <Link to="/auth/login" as="button">
          login
        </Link>
        <Link to="/auth/register" as="button">
          register
        </Link>
        <h1>{t('auth.Login.pageTitle')}</h1>
        <Form onSubmit={handleLogin} className="flex flex-col">
          <Input
            name="email"
            type="email"
            label={t('auth.Login.form.email')}
            placeholder={t('auth.Login.form.email')}
          />

          <Button type="submit">{t('auth.Login.login')}</Button>
        </Form>
        <Link to="/">home</Link>
      </div>
    </LoginLayout>
  );
};
