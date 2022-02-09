import { useAuth } from '@/context/auth-context';
import * as React from 'react';
import { Link } from 'react-router-dom';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const Navbar = () => {
  const MenuLink = ({ text, action }: any) => {
    return <button onClick={action}>{text}</button>;
  };

  const { state, ...auth } = useAuth();

  const handleLogin = () => {
    auth.reducer.doUserLogin({ name: { first: 'pablo', last: 'motos' } });
  };

  const handleRandomLogin = async () => {
    auth.reducer.doUserLogin({ name: { first: 'fer', last: 'montero' } });
  };

  const handleLogout = () => {
    auth.reducer.doLogout();
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
        {state.isLoggedIn && (
          <>
            <Link to="profile">profile</Link>
            <MenuLink text="logout" action={handleLogout} />
          </>
        )}
        {!state.isLoggedIn && (
          <>
            <Link to="/auth/login">login</Link>
            <Link to="/auth/register">register</Link>

            <MenuLink text="do login" action={handleLogin} />
            <MenuLink text="random login" action={handleRandomLogin} />
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
