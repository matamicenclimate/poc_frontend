import { allowedWallets } from 'algorand-session-wallet-deka';
import React, { useState } from 'react';
import { useAlert } from 'react-alert';
import { useTranslation } from 'react-i18next';

import { ReactComponent as LockIcon } from '@/assets/icons/bx-lock-alt.svg';
import { Button } from '@/componentes/Elements/Button/Button';
import { Spinner } from '@/componentes/Elements/Spinner/Spinner';
import { Title } from '@/componentes/Elements/Title/Title';
import { LoginLayout } from '@/componentes/Layout/LoginLayout';
import { WalletIssuer } from '@/features/auth';
import { useAuth } from '@/lib/auth';

import MagicLinkIcon from './3-Icon_Magic_White.svg';
import WalletConnectIcon from './WalletConnectIcon.svg';

const MenuButton: React.FC<{
  disabled?: boolean;
  logo: string;
  inverted?: boolean;
  children?: React.ReactNode;
  onClick?: JSX.IntrinsicElements['button']['onClick'];
}> = ({ disabled, children, logo, inverted, onClick }) => (
  <Button
    type="submit"
    disabled={disabled}
    size="md"
    variant={inverted == null ? 'primary' : 'light'}
    onClick={onClick}
  >
    <div className="flex items-center justify-center">
      <img src={logo} className="mr-3 w-8" /> {children}
    </div>
  </Button>
);

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
      {/*// TODO: Usar overlay*/}
      {/*<div*/}
      {/*  className="flex items-center justify-center"*/}
      {/*>*/}
      {/*  {isLoading ? <Spinner /> : null}*/}
      {/*</div>*/}
      <div className="mx-auto max-w-screen-sm space-y-8 text-left">
        <Title size={4} as={1}>
          {t('auth.Login.pageTitle')}
        </Title>
        <div>
          <p className="mb-4 text-left text-sm text-neutral-4">
            {t<string>('auth.Login.safetyWarning')}
          </p>
          <div className="flex items-center justify-center rounded-full bg-neutral-7 p-2 px-4 text-sm font-medium">
            <span className="fill-green-400">
              <LockIcon />
            </span>
            <p className="text-md">
              <span className="text-green-400">https://</span>secure.climatecoin.com/login
            </p>
          </div>
        </div>
        <hr />
        <div className="flex items-center justify-center">{isLoading ? <Spinner /> : null}</div>
        <div className="flex flex-col gap-4 text-left">
          <MenuButton logo={MagicLinkIcon} disabled={isLoading}>
            {t('auth.Login.MagicLink')}
          </MenuButton>
          <MenuButton
            inverted
            logo={allowedWallets['my-algo-connect'].img(false)}
            disabled={isLoading}
            onClick={() => handleExternalLogin(WalletIssuer.MYALGO)}
          >
            {t('auth.Login.MyAlgo')}
          </MenuButton>
          <MenuButton
            inverted
            logo={WalletConnectIcon}
            disabled={isLoading}
            onClick={() => handleExternalLogin(WalletIssuer.WALLETCONNECT)}
          >
            {t('auth.Login.WalletConnect')}
          </MenuButton>
        </div>
      </div>
    </LoginLayout>
  );
};
