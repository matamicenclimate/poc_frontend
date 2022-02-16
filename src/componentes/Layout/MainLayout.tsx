import * as React from 'react';
import { useAuth } from '@/lib/auth';
import { Link } from 'react-router-dom';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const Footer = () => {
  return <footer>footer</footer>;
};

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
        {auth.user && (
          <>
            <Link to="/profile">profile</Link>
            <MenuLink text="logout" action={handleLogout} />
          </>
        )}
        {!auth.user && (
          <>
            <Link to="/auth/login">login</Link>
            <Link to="/auth/register">register</Link>
          </>
        )}
      </div>
    </div>
  );
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="max-w-screen-sm mx-auto min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
};
