import * as React from 'react';
import { QueryClientProvider } from 'react-query';
// import { AuthProvider } from '@/context/auth-context';
import { ErrorBoundary } from 'react-error-boundary';
import { AuthProvider } from '@/lib/auth';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import { Alert } from '@/componentes/Elements/Alert/Alert';
import { queryClient } from '@/lib/react-query';

const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE,
};

const ErrorFallback = () => {
  return (
    <div
      className="text-red-500 w-screen h-screen flex flex-col justify-center items-center"
      role="alert"
    >
      <h2 className="text-lg font-semibold">Ooops, something went wrong :( </h2>
      <button className="mt-4" onClick={() => window.location.assign(window.location.origin)}>
        Refresh
      </button>
    </div>
  );
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AlertProvider template={Alert} {...options}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>{children}</AuthProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </AlertProvider>
  );
};
