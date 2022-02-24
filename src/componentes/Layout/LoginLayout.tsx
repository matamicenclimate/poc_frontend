import * as React from 'react';
import { useAuth } from '@/lib/auth';
import { Link } from 'react-router-dom';
import { Head } from './Head';
import logo from '@/assets/logo.png';
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
    <div className="w-full mx-auto border mb-4">
      <div className="max-w-screen-md mx-auto p-2 px-4 flex gap-4  justify-between">
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

export const LoginLayout = ({ title, children }: MainLayoutProps) => {
  return (
    <>
      <Head title={title} />
      <div className="min-h-screen grid grid-cols-5">
        {/* <Navbar /> */}
        <div className="col-span-2 bg-gray-300 p-4">
          <div>some text</div>
          <Link to="/">home</Link>
        </div>
        <div className="col-span-3 flex flex-col justify-around p-4">{children}</div>
        {/* <Footer /> */}
      </div>
    </>
  );
};
