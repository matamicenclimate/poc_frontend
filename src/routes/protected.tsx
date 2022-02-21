import { Navigate, Outlet } from 'react-router-dom';

import { Dashboard } from '@/features/misc/routes/Dashboard';
import { Profile } from '@/features/users/routes/Profile';
import { DocumentRouter } from '@/features/documents/routes/DocumentRouter';
import { Wallet } from '@/features/wallet/routes/Wallet';

const App = () => {
  return <Outlet />;
};

export const protectedRoutes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/documents/*', element: <DocumentRouter /> },
      { path: '/profile', element: <Profile /> },
      { path: '/wallet', element: <Wallet /> },
      { path: '/', element: <Dashboard /> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
];
