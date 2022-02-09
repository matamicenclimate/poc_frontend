import * as React from 'react';
import { MainLayout } from '@/componentes/Layout/MainLayout';
import { useAuth } from '@/context/auth-context';

export const Login = () => {
  const { state, ...auth } = useAuth();

  const handleLogin = () => {
    auth.reducer.doUserLogin({ name: { first: 'pablo', last: 'motos' } });
  };

  return (
    <MainLayout>
      ola k ase
      <button onClick={handleLogin}>hasme login</button>
    </MainLayout>
  );
};
