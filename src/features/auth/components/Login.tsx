import { Button } from '@/componentes/Elements/Button/Button';
import { Form } from '@/componentes/Form/Form';
import { Input } from '@/componentes/Form/Inputs';
import { LoginLayout } from '@/componentes/Layout/LoginLayout';
import { useAuth } from '@/lib/auth';
import { useTranslation } from 'react-i18next';
import { Title } from '@/componentes/Elements/Title/Title';
import { useState } from 'react';
import { ReactComponent as LockIcon } from '@/assets/icons/bx-lock-alt.svg';
import LogoMagic from '@/assets/icons/bx-magic-link.png';

export const Login = () => {
  const auth = useAuth();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (data: { email: string }) => {
    setLoading(true);
    await auth.login({ email: data.email });
    setLoading(false);
  };

  return (
    <LoginLayout title={t('auth.Login.pageTitle')}>
      <div className="mx-auto max-w-screen-sm space-y-8 text-center">
        <Title size={3} as={1}>
          {t('auth.Login.pageTitle')}
        </Title>
        <div>
          <p className="mb-4 text-sm text-neutral-4">{t<string>('auth.Login.safetyWarning')}</p>
          <div className="flex items-center justify-center rounded-full bg-neutral-7 p-2 px-4 text-sm font-medium">
            <LockIcon />
            <p>
              <span className="text-primary-green">https://</span>secure.climatecoin.com/login
            </p>
          </div>
        </div>
        <hr />
        <Form onSubmit={handleLogin} className="flex flex-col gap-8 text-left">
          <Input
            name="email"
            type="email"
            label={t('auth.Login.form.email.label')}
            placeholder={t('auth.Login.form.email.placeholder')}
            required
          />

          <Button type="submit" disabled={loading} size="sm">
            <div className="flex items-center justify-center">
              <>
                <img src={LogoMagic} className="mr-3 h-6 w-5" /> {t('auth.Login.login')}
              </>
            </div>
          </Button>
        </Form>
      </div>
    </LoginLayout>
  );
};
