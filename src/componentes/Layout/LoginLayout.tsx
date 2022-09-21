import * as React from 'react';
import { Link } from 'react-router-dom';

import Logolight from '@/assets/logo-light.png';

import LoginImage from '../../assets/images/login.jpg';
import { Head } from './Head';

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
            <img className="h-auto w-64" src={`${Logolight}`} />
          </Link>
        </div>
        <div className="col-span-3 grid grid-cols-3 items-center">{children}</div>
      </div>
    </>
  );
};
