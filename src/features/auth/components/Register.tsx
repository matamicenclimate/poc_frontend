import { Button } from '@/componentes/Elements/Button/Button';
import { Link } from '@/componentes/Elements/Link/Link';
import { Title } from '@/componentes/Elements/Title/Title';
import { Form } from '@/componentes/Form/Form';
import { Input } from '@/componentes/Form/Inputs';
import { LoginLayout } from '@/componentes/Layout/LoginLayout';
import { useAuth } from '@/lib/auth';
import { useTranslation } from 'react-i18next';

export const Register = () => {
  const auth = useAuth();
  const { t } = useTranslation();

  const handleLogin = async (data: { email: string }) => {
    await auth.login({ email: data.email });
  };

  return (
    <LoginLayout title={t('auth.Register.pageTitle')}>
      <div>
        <Link to="/auth/login" as="button">
          login
        </Link>
        <Link to="/auth/register" as="button">
          register
        </Link>
        <Title size={1}>{t('auth.Register.pageTitle')}</Title>
        <Form onSubmit={handleLogin} className="flex flex-col">
          <Input
            name="email"
            type="email"
            label={t('auth.Login.form.email')}
            placeholder={t('auth.Login.form.email')}
          />

          <Button type="submit">{t('auth.Register.register')}</Button>
        </Form>
      </div>
    </LoginLayout>
  );
};
