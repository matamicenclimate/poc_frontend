import { Route, Routes } from 'react-router-dom';
import { DocumentDetails } from '../components/Details';
import { DocumentList } from '../components/List';
import { Upload } from '../components/Upload';

export const DocumentRouter = () => {
  return (
    <Routes>
      <Route path="upload" element={<Upload />} />
      <Route path="list" element={<DocumentList />} />
      <Route path=":documentId" element={<DocumentDetails />} />
    </Routes>
  );
};
