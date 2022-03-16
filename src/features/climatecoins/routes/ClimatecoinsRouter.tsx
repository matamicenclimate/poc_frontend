import { Navigate, Route, Routes } from 'react-router-dom';
import { Buy } from '../pages/Buy';

export const ClimatecoinsRouter = () => {
  return (
    <Routes>
      <Route path="buy" element={<Buy />} />
      <Route path="*" element={<Navigate to="buy" />} />
    </Routes>
  );
};
