import { Navigate } from 'react-router-dom';

import { AuthRouter } from '@/features/auth';

export const publicRoutes = [
  {
    path: '/auth/*',
    element: <AuthRouter />,
  },
  { path: '*', element: <Navigate to="." /> },
];
