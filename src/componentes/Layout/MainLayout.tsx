import * as React from 'react';
import { Head } from './Head';
import { Navbar } from './Navbar/Navbar';

interface MainLayoutProps {
  title?: string;
  children: React.ReactNode;
}

export const MainLayout = ({ title, children }: MainLayoutProps) => {
  return (
    <>
      <Head title={title} />
      <div className="flex min-h-screen flex-col pb-12">
        <Navbar />
        <div className="mx-auto w-full max-w-screen-lg flex-grow">{children}</div>
      </div>
    </>
  );
};
