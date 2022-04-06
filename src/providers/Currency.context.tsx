import React, { createContext, useContext, useState } from 'react';
import { getCurrenciesExchangeRate } from '@/providers/api/getCurrenciesExchangeRate';
import { UseQueryResult } from 'react-query';
import { useAuth } from '@/lib/auth';
import { useTranslation } from 'react-i18next';

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
  BTC: 'BTC',
};

const simbols = {
  [currencies.EUR]: '€',
  [currencies.USD]: '$',
  [currencies.JPY]: '¥',
  [currencies.GBP]: '£',
  [currencies.BTC]: '₿',
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
      currency: 'USD',
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
  const { i18n } = useTranslation();
  if (!ctx) {
    throw new Error('useCurrencyContext must be used within a CurrencyContextProvider');
  }

  const { state, setState, exchangeRate } = ctx;

  const reducer = {
    setCurrency: (currency: ContextState['currency']) => setState((old) => ({ ...old, currency })),
  };

  const convertCurrency = (amountInCents: number) => {
    if (state.currency === 'USD') return amountInCents;
    return amountInCents * exchangeRate.data[`USD_${state.currency}`.toLowerCase()];
  };

  const centsToFixed = (amountInCents: number) => {
    return (amountInCents / 100).toFixed(2);
  };

  const formatter = (amountInCents: number) => {
    return new Intl.NumberFormat(i18n.language, {
      style: 'currency',
      currency: state.currency,
    }).format(convertCurrency(amountInCents));
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
