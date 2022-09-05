import { Navigate, Outlet, useRoutes } from 'react-router-dom';

import { AboutUs, EmailVerificationCallback, TermsAndConditions } from '@/features/misc';
import { NFTRouter } from '@/features/nfts';
import { useAuth } from '@/lib/auth';

import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

export const AppRouter = () => {
  const auth = useAuth();

  const commonRoutes = [
    {
      path: '/',
      element: <Outlet />,
      children: [
        { path: '/about', element: <AboutUs /> },
        { path: '/terms-conditions', element: <TermsAndConditions /> },
        { path: '/verify-email', element: <EmailVerificationCallback /> },
        { path: '*', element: <Navigate to="/" /> },
      ],
    },
    { path: '/nfts/*', element: <NFTRouter /> },
  ];

  const routes = auth.user ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};
