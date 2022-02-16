import { Route, Routes } from 'react-router-dom';
import { UploadDocuments } from '../components/UploadDocuments';

export const UploadRouter = () => {
  return (
    <Routes>
      <Route path="documents" element={<UploadDocuments />} />
    </Routes>
  );
};
