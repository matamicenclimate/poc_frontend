import React, { createContext, useContext, useState } from 'react';

interface Context {
  state: ContextState;
  setState: React.Dispatch<React.SetStateAction<ContextState>>;
}

const currencies = {
  EUR: 'EUR',
  USD: 'USD',
  JPY: 'JPY',
  GBP: 'GBP',
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

  return (
    <CurrencyContext.Provider value={{ state, setState }}>{children}</CurrencyContext.Provider>
  );
};

export const useCurrencyContext = () => {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    throw new Error('useCurrencyContext must be used within a CurrencyContextProvider');
  }

  const { state, setState } = ctx;

  const reducer = {
    setCurency: (currency: ContextState['currency']) => setState((old) => ({ ...old, currency })),
  };

  return { state, reducer };
};
