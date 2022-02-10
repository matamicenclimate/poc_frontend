import { useAuth } from '@/lib/auth';
import * as React from 'react';
import { Link } from 'react-router-dom';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const Navbar = () => {
  const MenuLink = ({ text, action }: any) => {
    return <button onClick={action}>{text}</button>;
  };

  const auth = useAuth();

  const handleLogin = () => {
    auth.login({ name: { first: 'pablo', last: 'motos' } } as any);
  };

  const handleLogout = () => {
    auth.logout();
    window.location.assign(window.location.origin as unknown as string);
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
            <Link to="profile" >profile</Link>
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
    <div className="max-w-screen-sm mx-auto">
      <Navbar />
      {children}
    </div>
  );
};
