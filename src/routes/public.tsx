import * as React from 'react';
import { lazyImport } from '@/utils/lazyImport';

import { AuthRouter } from '@/features/auth/routes/AuthRouter';
import { Navigate } from 'react-router-dom';

export const publicRoutes = [
  {
    path: '/auth/*',
    element: <AuthRouter />,
  },
  { path: '*', element: <Navigate to="." /> },
];
