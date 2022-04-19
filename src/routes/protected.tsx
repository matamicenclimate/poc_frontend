import { Navigate, Outlet } from 'react-router-dom';

import { Overview } from '@/features/misc/routes/Overview';
import { Profile } from '@/features/users/routes/Profile';
import { DocumentRouter } from '@/features/documents/routes/DocumentRouter';
import { Wallet } from '@/features/wallet/routes/Wallet';
import { ClimatecoinsRouter } from '@/features/climatecoins/routes/ClimatecoinsRouter';

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
