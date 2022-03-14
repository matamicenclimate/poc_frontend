import * as React from 'react';
import { useAuth } from '@/lib/auth';
import { Head } from './Head';
import logo from '@/assets/logo.png';
import { Link } from '@/componentes/Elements/Link/Link';
interface MainLayoutProps {
  title?: string;
  children: React.ReactNode;
}

export const Footer = () => {
  return <footer>footer</footer>;
};

const linkStyle = 'flex items-center';

export const Navbar = () => {
  const MenuLink = ({ text, action }: any) => {
    return <button onClick={action}>{text}</button>;
  };

  const auth = useAuth();

  const handleLogout = () => {
    auth.logout();
  };

  return (
    <div className="mx-auto mb-4 w-full border">
      <div className="mx-auto flex max-w-screen-md justify-between gap-4 p-2  px-4">
        <div>
          <Link to="/">
            <img src={logo} alt="dekalabs react test" className="w-12" />
          </Link>
        </div>
        <div className="flex gap-4">
          <Link to="/wallet" className={linkStyle}>
            0 CLIMATE
          </Link>
          {auth.user && (
            <>
              <Link to="/documents/list" className={linkStyle}>
                documents
              </Link>
              <Link to="/profile" className={linkStyle}>
                profile
              </Link>
              <MenuLink text="logout" className="link" action={handleLogout} />
            </>
          )}
          {!auth.user && (
            <>
              <Link to="/auth/login" className={linkStyle}>
                login
              </Link>
              <Link to="/auth/register" className={linkStyle}>
                register
              </Link>
            </>
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
