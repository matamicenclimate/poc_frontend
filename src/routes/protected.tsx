import { Navigate, Outlet } from 'react-router-dom';

import { ClimatecoinsRouter } from '@/features/compensations';
import { DocumentRouter } from '@/features/documents';
import { Overview } from '@/features/misc';
import { Profile } from '@/features/users';
import { Wallet } from '@/features/wallet';

const App = () => {
  return <Outlet />;
};

export const protectedRoutes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/documents/*', element: <DocumentRouter /> },
      { path: '/coins/*', element: <ClimatecoinsRouter /> },
      { path: '/profile', element: <Profile /> },
      { path: '/wallet/*', element: <Wallet /> },
      { path: '/home', element: <Overview /> },
      { path: '/', element: <Navigate to="/home" /> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
];
