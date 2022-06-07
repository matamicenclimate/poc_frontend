import { useTranslation } from 'react-i18next';

import LogoDark from '@/assets/logo-dark.png';
import { Link } from '@/componentes/Elements/Link/Link';
import { NotificationNav } from '@/componentes/Layout/Navbar/sections/NotificationNav';
import { useAuth } from '@/lib/auth';

import { CurrencyNav } from './sections/CurrencyNav';
import { ProfileNav } from './sections/ProfileNav';
import { WalletNav } from './sections/WalletNav';

const linkStyle = 'flex items-center text-sm hover:underline';

export const Navbar = () => {
  const auth = useAuth();
  const { t } = useTranslation();

  return (
    <div className="mx-auto w-full border pb-5 pt-5">
      <div className="mx-auto flex w-full max-w-screen-xl">
        <div className="flex items-center justify-center border-r pr-10">
          <Link to="/">
            <img className="h-auto w-48" src={`${LogoDark}`} />
          </Link>
        </div>
        <div className="flex w-full justify-between">
          <div className="flex gap-8 pl-10">
            <Link to="/home" className={`text-neutral-2 ${linkStyle}`} navLink>
              {t('components.Navbar.home')}
            </Link>
            <Link to="/coins/compensate" className={`text-neutral-4 ${linkStyle}`} navLink>
              {t('components.Navbar.burn')}
            </Link>
            <Link to="/about" className={` text-neutral-4 ${linkStyle}`} navLink>
              {t('components.Navbar.about')}
            </Link>
            <Link to="/nfts/list" className={` text-neutral-4 ${linkStyle}`} navLink>
              {t('components.Navbar.nfts')}
            </Link>
            {auth.user && auth.user.type === 'developer' && (
              <Link to="/documents/list" className={`text-primary ${linkStyle}`} navLink>
                {t('components.Navbar.developer')}
              </Link>
            )}
          </div>
          {auth.user && (
            <div className="flex gap-4">
              <CurrencyNav />

              <NotificationNav />

              <WalletNav />

              <ProfileNav />
            </div>
          )}

          {!auth.user && (
            <div className="mr-20 flex flex-row gap-3">
              <Link to="/auth/login" className={linkStyle}>
                login
              </Link>
              <Link to="/auth/register" className={linkStyle}>
                register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
