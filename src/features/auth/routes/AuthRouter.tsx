import * as React from 'react';
import { Route, Routes } from 'react-router-dom';

export const AuthRouter = () => {
  return (
    <Routes>
      <Route path="register" element={<p>register</p>} />
      <Route path="login" element={<p>login</p>} />
    </Routes>
  );
};
