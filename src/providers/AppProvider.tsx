import * as React from 'react';
import { QueryClientProvider } from 'react-query';
// import { AuthProvider } from '@/context/auth-context';
import { ErrorBoundary } from 'react-error-boundary';
import { AuthProvider } from '@/lib/auth';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import { Alert } from '@/componentes/Elements/Alert/Alert';
import { queryClient } from '@/lib/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { ReactQueryDevtools } from 'react-query/devtools';
import { WalletProvider } from './Wallet.context';
import { CurrencyProvider } from './Currency.context';

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
      className="flex h-screen w-screen flex-col items-center justify-center text-red-500"
      role="alert"
    >
      <h2 className="text-lg font-semibold">Ooops, something went wrong :( </h2>
      <button className="mt-4" onClick={() => window.location.assign(window.location.origin)}>
        Refresh
      </button>
    </div>
  );
};

export const AppProvider = ({ children }: { children: React.ReactElement }) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <HelmetProvider>
        <AlertProvider template={Alert} {...options}>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
              <CurrencyProvider>
                <WalletProvider>{children}</WalletProvider>
              </CurrencyProvider>
            </AuthProvider>
          </QueryClientProvider>
        </AlertProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
};
