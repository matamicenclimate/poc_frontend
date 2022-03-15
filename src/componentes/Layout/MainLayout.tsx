import * as React from 'react';
import { useAuth } from '@/lib/auth';
import { Head } from './Head';
import logo from '@/assets/logo.png';
import { Link } from '@/componentes/Elements/Link/Link';
import { Dropdown } from '../Elements/Dropdown/Dropdown';
interface MainLayoutProps {
  title?: string;
  children: React.ReactNode;
}

export const Footer = () => {
  return <footer>footer</footer>;
};

const linkStyle = 'flex items-center text-sm';

export const Navbar = () => {
  const MenuLink = ({ text, action }: any) => {
    return <button onClick={action}>{text}</button>;
  };

  const auth = useAuth();

  const handleLogout = () => {
    auth.logout();
  };

  const profileOptions = [
    { name: 'Profile', href: '/profile', description: 'Manage your profile' },
    {
      name: 'Payment methods',
      href: '/payment-methods',
      description: 'Manage your payment methods',
    },
    { name: 'Security', href: '/security', description: 'Manage your account security' },
    {
      name: 'Configuration',
      href: '/configuration',
      description: 'Set up your account and alerts',
    },
    { name: 'Promoter mode', href: '/documents/upload', description: 'Create your own credits' },
  ];

  const walletOptions = [
    { name: 'Wallet', href: '/' },
    { name: 'Inditex', href: '/' },
  ];

  return (
    <div className="mx-auto w-full border pb-5 pt-5">
      <div className="mx-auto flex">
        <div className="mr-10 pl-20">
          <Link to="/">
            <img src={logo} alt="dekalabs react test" className="w-12" />
          </Link>
        </div>
        <div className="flex w-full justify-between">
          <div className="flex gap-8">
            <Link to="/home" className={`text-neutral-2 ${linkStyle}`}>
              Home
            </Link>
            <Link to="/buy" className={`text-neutral-4 ${linkStyle}`}>
              Buy
            </Link>
            <Link to="/sell" className={`text-neutral-4 ${linkStyle}`}>
              Sell
            </Link>
            <Link to="/about-us" className={`text-neutral-4 ${linkStyle}`}>
              About us
            </Link>
            {auth.user && (
              <Link to="/developer" className={`text-primary ${linkStyle}`}>
                Developer
              </Link>
            )}
          </div>
          {auth.user && (
            <div className="flex gap-8 pr-20">
              <Link to="/" className={`text-neutral-2 ${linkStyle}`}>
                Moneda
              </Link>
              <Link to="/notifications" className={`text-neutral-4 ${linkStyle}`}>
                Campanita
              </Link>

              <Dropdown label={'Wallet'} options={walletOptions} />
              <Dropdown
                label={
                  <img
                    className="h-10 w-10 rounded-full"
                    alt="100x100"
                    src="https://mdbootstrap.com/img/Photos/Avatars/img%20(30).jpg"
                    data-holder-rendered="true"
                  />
                }
                options={profileOptions}
              >
                <MenuLink
                  text="logout"
                  className="bg-primary text-neutral-8"
                  action={handleLogout}
                />
              </Dropdown>
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

export const MainLayout = ({ title, children }: MainLayoutProps) => {
  return (
    <>
      <Head title={title} />
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="mx-auto w-full max-w-screen-lg flex-grow">{children}</div>
        <Footer />
      </div>
    </>
  );
};
