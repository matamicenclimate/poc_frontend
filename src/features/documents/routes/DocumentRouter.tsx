import { Route, Routes } from 'react-router-dom';
import { DocumentDetails } from '../components/Details';
import { DocumentList } from '../components/List';
import { UploadDocuments } from '../components/UploadDocuments';

export const DocumentRouter = () => {
  return (
    <Routes>
      <Route path="upload" element={<UploadDocuments />} />
      <Route path="list" element={<DocumentList />} />
      <Route path=":documentId" element={<DocumentDetails />} />
    </Routes>
  );
};
