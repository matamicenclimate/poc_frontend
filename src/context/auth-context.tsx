import React, { createContext, useContext, useState } from 'react';
import { useEffect } from 'react';

interface Context {
  state: ContextState;
  setState: React.Dispatch<React.SetStateAction<ContextState>>;
}

interface ContextState {
  isLoggedIn: boolean;
  user?: {
    name: {
      first: string;
      last: string;
    };
  };
}

const AuthContext = createContext<Context | null>(null);

interface ProviderProps {
  initialData?: ContextState;
  children: React.ReactNode;
}

export const AuthProvider = ({ initialData, children }: ProviderProps) => {
  const [state, setState] = useState(
    initialData ?? {
      isLoggedIn: false,
      user: {
        name: {
          first: 'foferlio',
          last: 'the g',
        },
      },
    }
  );

  useEffect(() => {
    console.log('call the api to see if the user is logge in');
  }, []);

  return <AuthContext.Provider value={{ state, setState }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  const { state, setState } = ctx;

  const reducer = {
    doUserLogin: (user: ContextState['user']) =>
      setState((old) => ({ ...old, user, isLoggedIn: true })),
    doLogout: () => setState((old) => ({ ...old, user: undefined, isLoggedIn: false })),
  };

  return { state, reducer };
};
