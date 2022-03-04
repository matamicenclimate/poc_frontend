import { Navigate, Route, Routes } from 'react-router-dom';
import { NFTList } from '../components/List';

export const NFTRouter = () => {
  return (
    <Routes>
      <Route path="list" element={<NFTList />} />
      <Route path="*" element={<Navigate to="list" />} />
    </Routes>
  );
};
