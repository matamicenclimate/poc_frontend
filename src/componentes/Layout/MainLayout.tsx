import * as React from 'react';
import { Head } from './Head';
import { Navbar } from './Navbar/Navbar';

interface MainLayoutProps {
  title?: string;
  children: React.ReactNode;
}

export const Footer = () => {
  return (
    <footer className="animate-pulse">
      <div className="m-4 rounded bg-gray-200 p-2">aqui va el footer</div>
    </footer>
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
