import { Route, Routes } from 'react-router-dom';
import { Callback } from '../components/Callback';
import { Login } from '../components/Login';

export const AuthRouter = () => {
  return (
    <Routes>
      <Route path="register" element={<Login />} />
      <Route path="login" element={<Login />} />
      <Route path="callback" element={<Callback />} />
    </Routes>
  );
};
