import { createMemoryHistory } from 'history';
import { positions, Provider as AlertProvider, transitions } from 'react-alert';
import { QueryClientProvider } from 'react-query';
import { Router } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import { Alert } from '@/componentes/Elements/Alert/Alert';
import { testQueryClient } from '@/lib/react-query';
import { AppProvider } from '@/providers/AppProvider';
import { CurrencyProvider } from '@/providers/Currency.context';
import { WalletProvider } from '@/providers/Wallet.context';

export const DefaultRender = ({ children }: any) => {
  const history = createMemoryHistory();
  history.push('/some/bad/route');
  return (
    <AppProvider>
      <BrowserRouter>{children}</BrowserRouter>
    </AppProvider>
  );
};

export const MockAuthRender = ({ children, history }: any) => {
  const options = {
    // you can also just use 'bottom center'
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: '30px',
    // you can also just use 'scale'
    transition: transitions.SCALE,
  };
  return (
    <AlertProvider template={Alert} {...options}>
      <QueryClientProvider client={testQueryClient}>
        <CurrencyProvider>
          <WalletProvider>
            <Router location={history.location} navigator={history}>
              {children}
            </Router>
          </WalletProvider>
        </CurrencyProvider>
      </QueryClientProvider>
    </AlertProvider>
  );
};
