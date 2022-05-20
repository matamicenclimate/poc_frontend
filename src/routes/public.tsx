import { AuthRouter } from '@/features/auth';
import { Navigate } from 'react-router-dom';

export const publicRoutes = [
  {
    path: '/auth/*',
    element: <AuthRouter />,
  },
  { path: '*', element: <Navigate to="." /> },
];
