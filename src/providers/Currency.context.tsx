import React, { createContext, useContext, useState } from 'react';
import { getCurrenciesExchangeRate } from '@/providers/api/getCurrenciesExchangeRate';
import { UseQueryResult } from 'react-query';

interface Context {
  state: ContextState;
  exchangeRate: UseQueryResult<any>;
  setState: React.Dispatch<React.SetStateAction<ContextState>>;
}

const currencies = {
  EUR: 'EUR',
  USD: 'USD',
  JPY: 'JPY',
  GBP: 'GBP',
};

const simbols = {
  [currencies.EUR]: '€',
  [currencies.USD]: '$',
  [currencies.JPY]: '¥',
  [currencies.GBP]: '£',
};

interface ContextState {
  currency: keyof typeof currencies;
}

const CurrencyContext = createContext<Context | null>(null);

interface ProviderProps {
  initialData?: ContextState;
  children: React.ReactNode;
}

export const CurrencyProvider = ({ initialData, children }: ProviderProps) => {
  const [state, setState] = useState<ContextState>(
    initialData ?? {
      currency: 'EUR',
    }
  );

  const exchangeRate = getCurrenciesExchangeRate();

  return (
    <CurrencyContext.Provider value={{ state, setState, exchangeRate }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrencyContext = () => {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    throw new Error('useCurrencyContext must be used within a CurrencyContextProvider');
  }

  const { state, setState, exchangeRate } = ctx;

  const reducer = {
    setCurrency: (currency: ContextState['currency']) => setState((old) => ({ ...old, currency })),
  };

  const convertCurrency = (amountInCents: number) => {
    return amountInCents * exchangeRate.data[`USD_${state.currency}`];
  };

  const centsToFixed = (amountInCents: number) => {
    return (amountInCents / 100).toFixed(2);
  };

  const formatter = (amountInCents: number) => {
    let prefix = '';
    let suffix = '';

    if ([currencies.USD, currencies.EUR].includes(state.currency)) {
      suffix = simbols[state.currency];
    } else {
      prefix = simbols[state.currency];
    }

    return `${prefix}${centsToFixed(amountInCents)}${suffix}`.trim();
  };

  return {
    state,
    reducer,
    currencies,
    convertCurrency,
    centsToFixed,
    formatter,
    currencySymbol: simbols[state.currency],
  };
};
