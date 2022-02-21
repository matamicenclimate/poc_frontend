import * as React from 'react';
import { useAuth } from '@/lib/auth';
import { Link } from 'react-router-dom';
import { Head } from './Head';

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
    <div className="p-4 border flex gap-4 mb-4 justify-between">
      <div>
        <Link to="/">
          <img
            src="https://app.dekaweb.staging.dekaside.com/_nuxt/img/brand-deka-logo-m.795996a.svg"
            alt="dekalabs react test"
          />
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
  );
};

export const MainLayout = ({ title, children }: MainLayoutProps) => {
  return (
    <>
      <Head title={title} />
      <div className="max-w-screen-sm mx-auto min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow">{children}</div>
        <Footer />
      </div>
    </>
  );
};
