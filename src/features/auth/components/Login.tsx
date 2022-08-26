import { allowedWallets } from 'algorand-session-wallet-deka';
import { useState } from 'react';
import { useAlert } from 'react-alert';
import { useTranslation } from 'react-i18next';

import { ReactComponent as LockIcon } from '@/assets/icons/bx-lock-alt.svg';
import LogoMagic from '@/assets/icons/bx-magic-link.png';
import { Button } from '@/componentes/Elements/Button/Button';
import { Spinner } from '@/componentes/Elements/Spinner/Spinner';
import { Title } from '@/componentes/Elements/Title/Title';
import { Form } from '@/componentes/Form/Form';
import { Input } from '@/componentes/Form/Inputs';
import { LoginLayout } from '@/componentes/Layout/LoginLayout';
import { WalletIssuer } from '@/features/auth';
import { useAuth } from '@/lib/auth';

export const Login = () => {
  const auth = useAuth();
  const { t } = useTranslation();
  const alert = useAlert();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = async (issuer: WalletIssuer, email = '') => {
    setIsLoading(true);
    try {
      await auth.login({ email, issuer });
    } catch (e) {
      alert.error('Error loging in');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMagicLogin = async (data: { email: string }) => {
    await handleLogin(WalletIssuer.MAGICLINK, data.email);
  };
  const handleExternalLogin = async (issuer: WalletIssuer) => {
    await handleLogin(issuer);
  };

  return (
    <LoginLayout title={t('auth.Login.pageTitle')}>
      <div className="mx-auto max-w-screen-sm space-y-8 text-left">
        <Title size={4} as={1}>
          {t('auth.Login.pageTitle')}
        </Title>
        <div>
          <p className="mb-4 text-left text-sm text-neutral-4">
            {t<string>('auth.Login.safetyWarning')}
          </p>
          <div className="flex items-center justify-center rounded-full bg-neutral-7 p-2 px-4 text-sm font-medium">
            <LockIcon />
            <p>
              <span className="text-primary-green">https://</span>secure.climatecoin.com/login
            </p>
          </div>
        </div>
        <hr />
        <Form onSubmit={handleMagicLogin} className="flex flex-col gap-8 text-left">
          <Input
            name="email"
            type="email"
            label={t('auth.Login.form.email.label')}
            placeholder={t('auth.Login.form.email.placeholder')}
            required
          />
          <Button type="submit" disabled={isLoading} size="sm">
            <div className="flex items-center justify-center">
              <>
                <img src={LogoMagic} className="mr-3 h-6 w-5" /> {t('auth.Login.MagicLink')}
              </>
            </div>
          </Button>
        </Form>
        <div className="flex items-center justify-center">{isLoading ? <Spinner /> : null}</div>
        <div className="flex flex-col gap-8 text-left">
          <Button
            type="button"
            onClick={() => handleExternalLogin(WalletIssuer.MYALGO)}
            disabled={isLoading}
            size="sm"
          >
            <div className="flex items-center justify-center">
              <>
                <img src={allowedWallets['my-algo-connect'].img(false)} className="mr-3 h-6 w-5" />{' '}
                {t('auth.Login.MyAlgo')}
              </>
            </div>
          </Button>
          <Button
            type="button"
            onClick={() => handleExternalLogin(WalletIssuer.WALLETCONNECT)}
            disabled={isLoading}
            size="sm"
          >
            <div className="flex items-center justify-center">
              <>
                <img src={allowedWallets['wallet-connect'].img(false)} className="mr-3 h-6 w-5" />
                {t('auth.Login.WalletConnect')}
              </>
            </div>
          </Button>
        </div>
      </div>
    </LoginLayout>
  );
};
