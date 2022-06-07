import { createMemoryHistory } from 'history';
import { positions, Provider as AlertProvider, transitions } from 'react-alert';
import { QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';

import { Alert } from '@/componentes/Elements/Alert/Alert';
import { queryClient } from '@/lib/react-query';
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

export const MockAuthRender = ({ children }: any) => {
  const options = {
    // you can also just use 'bottom center'
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: '30px',
    // you can also just use 'scale'
    transition: transitions.SCALE,
  };
  const history = createMemoryHistory();
  history.push('/');
  return (
    <AlertProvider template={Alert} {...options}>
      <QueryClientProvider client={queryClient}>
        <CurrencyProvider>
          <WalletProvider>
            <BrowserRouter>{children}</BrowserRouter>
          </WalletProvider>
        </CurrencyProvider>
      </QueryClientProvider>
    </AlertProvider>
  );
};
