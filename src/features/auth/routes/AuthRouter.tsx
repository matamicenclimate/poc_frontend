import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Login } from '../components/Login';
import { Register } from '../components/Register';

export const AuthRouter = () => {
  return (
    <Routes>
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
};
