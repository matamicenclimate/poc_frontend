import * as React from 'react';
import { Link } from 'react-router-dom';
import { Head } from './Head';
import { ReactComponent as Logolight } from '@/assets/logo-light.svg';
import LoginImage from '../../assets/images/login.jpg';

interface MainLayoutProps {
  title?: string;
  children: React.ReactNode;
}

export const LoginLayout = ({ title, children }: MainLayoutProps) => {
  return (
    <>
      <Head title={title} />
      <div className="grid min-h-screen grid-cols-5">
        <div
          className="col-span-2 bg-gray-300 bg-cover bg-no-repeat p-8"
          style={{ backgroundImage: `url(${LoginImage})` }}
        >
          <Link to="/">
            <Logolight className="h-auto w-64" />
          </Link>
        </div>
        <div className="col-span-3 flex flex-col justify-around p-4">{children}</div>
      </div>
    </>
  );
};
