import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import { protectedRoutes } from './protected';
import { publicRoutes } from './public';
import { useAuth } from '@/lib/auth';
import { NFTRouter } from '@/features/nfts';
import { AboutUs, Overview, TermsAndConditions } from '@/features/misc';

export const AppRouter = () => {
  const auth = useAuth();

  const commonRoutes = [
    {
      path: '/',
      element: <Outlet />,
      children: [
        { path: '/about', element: <AboutUs /> },
        { path: '/terms-conditions', element: <TermsAndConditions /> },
        { path: '.', element: <Overview /> },
        { path: '*', element: <Navigate to="." /> },
      ],
    },
    { path: '/nfts/*', element: <NFTRouter /> },
  ];

  const routes = auth.user ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};
