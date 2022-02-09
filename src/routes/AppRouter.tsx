import * as React from 'react';
import { useAuth } from '@/context/auth-context';
import { useRoutes } from 'react-router-dom';
import { protectedRoutes } from './protected';
import { publicRoutes } from './public';
import { Landing } from '@/features/misc/routes/Landing';

export const AppRouter = () => {
  const auth = useAuth();

  const commonRoutes = [{ path: '/', element: <Landing /> }];

  const routes = auth.state.isLoggedIn ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};
