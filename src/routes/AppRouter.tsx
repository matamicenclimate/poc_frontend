import { useRoutes } from 'react-router-dom';
import { protectedRoutes } from './protected';
import { publicRoutes } from './public';
import { useAuth } from '@/lib/auth';
import { NFTRouter } from '@/features/nfts';
import { Overview, TermsAndConditions } from '@/features/misc';

export const AppRouter = () => {
  const auth = useAuth();

  const commonRoutes = [
    { path: '/', element: <Overview /> },
    { path: '/nfts/*', element: <NFTRouter /> },
    { path: '/terms-conditions', element: <TermsAndConditions /> },
  ];

  const routes = auth.user ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};
