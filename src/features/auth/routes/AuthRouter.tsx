import { Route, Routes } from 'react-router-dom';

import { Login } from '../components/Login';

export const AuthRouter = () => {
  return (
    <Routes>
      <Route path="register" element={<Login />} />
      <Route path="login" element={<Login />} />
      {/*<Route path="callback" element={<Callback />} />*/}
    </Routes>
  );
};
