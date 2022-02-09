import * as React from 'react';
import { lazyImport } from '@/utils/lazyImport';

import { AuthRouter } from '@/features/auth/routes/AuthRouter';

export const publicRoutes = [
  {
    path: '/auth/*',
    element: <AuthRouter />,
  },
];
