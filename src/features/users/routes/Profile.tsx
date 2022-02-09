import * as React from 'react';
import { MainLayout } from '@/componentes/Layout/MainLayout';
import { useAuth } from '@/context/auth-context';

export const Profile = () => {
  const { state, ...auth } = useAuth();

  return (
    <MainLayout>
      profile
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </MainLayout>
  );
};