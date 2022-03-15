import { useRoutes } from 'react-router-dom';
import { protectedRoutes } from './protected';
import { publicRoutes } from './public';
import { useAuth } from '@/lib/auth';
import { NFTRouter } from '@/features/nfts/routes/NFTRouter';
import { Login } from '@/features/auth/components/Login';

export const AppRouter = () => {
  const auth = useAuth();

  const commonRoutes = [
    { path: '/', element: <Login /> },
    { path: '/nfts/*', element: <NFTRouter /> },
  ];

  const routes = auth.user ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};
