import { useRoutes } from 'react-router-dom';
import { protectedRoutes } from './protected';
import { publicRoutes } from './public';
import { Landing } from '@/features/misc/routes/Landing';
import { useAuth } from '@/lib/auth';
import { NFTRouter } from '@/features/nfts/routes/NFTRouter';

export const AppRouter = () => {
  const auth = useAuth();

  const commonRoutes = [
    { path: '/', element: <Landing /> },
    { path: '/nfts/*', element: <NFTRouter /> },
  ];

  const routes = auth.user ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};
