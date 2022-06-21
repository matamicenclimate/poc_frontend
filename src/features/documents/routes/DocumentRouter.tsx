import { Navigate, Route, Routes } from 'react-router-dom';

import { DocumentDetails } from '../pages/Details';
import { DocumentList } from '../pages/List';
import { Upload } from '../pages/Upload';

export const DocumentRouter = () => {
  return (
    <Routes>
      <Route path="upload" element={<Upload />} />
      <Route path="list" element={<DocumentList />} />

      <Route path="buys" element={<DocumentList defaultFilter={{ status: 'accepted' }} />} />
      <Route path="sells" element={<DocumentList defaultFilter={{ status: 'completed' }} />} />
      <Route path=":documentId" element={<DocumentDetails />} />
      <Route path="*" element={<Navigate to="list" />} />
    </Routes>
  );
};
