import { useAuth } from '@/lib/auth';
import { WalletNav } from './sections/WalletNav';
import { ProfileNav } from './sections/ProfileNav';
import { Link } from '@/componentes/Elements/Link/Link';
import { ReactComponent as LogoDark } from '@/assets/logo-dark.svg';
import { ReactComponent as IconBell } from '@/assets/icons/bx-bell-line.svg';
import { CurrencyNav } from './sections/CurrencyNav';

const linkStyle = 'flex items-center text-sm';

export const Navbar = () => {
  const auth = useAuth();

  return (
    <div className="mx-auto w-full border pb-5 pt-5">
      <div className="mx-auto flex w-full max-w-screen-xl">
        <div className="border-r pr-10">
          <Link to="/">
            <LogoDark className="w-44" />
          </Link>
        </div>
        <div className="flex w-full justify-between">
          <div className="flex gap-8 pl-10">
            <Link to="/home" className={`text-neutral-2 ${linkStyle}`}>
              Home
            </Link>
            <Link to="/coins/buy" className={`text-neutral-4 ${linkStyle}`}>
              Buy
            </Link>
            <Link to="/sell" className={`text-neutral-4 ${linkStyle}`}>
              Sell
            </Link>
            <Link
              href="https://climatetrade.com/es/inicio/"
              target="_blank"
              className={`text-neutral-4 ${linkStyle}`}
            >
              About us
            </Link>
            {auth.user && (
              <Link to="/documents/upload" className={`text-primary ${linkStyle}`}>
                Developer
              </Link>
            )}
          </div>
          {auth.user && (
            <div className="flex gap-8">
              <CurrencyNav />

              <Link to="/notifications" className={`text-neutral-4 ${linkStyle}`}>
                <IconBell />
              </Link>

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
