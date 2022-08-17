import { Navigate, Route, Routes } from 'react-router-dom';

import { PaginationProvider } from '@/providers/Pagination.context';

import { DocumentDetails } from '../pages/Details';
import { DocumentList } from '../pages/List';
import { DocumentTransactions } from '../pages/Transactions';
import { Upload } from '../pages/Upload';

export const DocumentRouter = () => {
  return (
    <Routes>
      <Route path="upload" element={<Upload />} />
      <Route path="list" element={<PaginationProvider><DocumentList /></PaginationProvider>} />

      <Route path="buys" element={<PaginationProvider><DocumentList defaultFilter={{ status: 'accepted' }} /></PaginationProvider>} />
      <Route path="sells" element={<PaginationProvider><DocumentList defaultFilter={{ status: 'completed' }} /></PaginationProvider>} />
      <Route path=":documentId" element={<DocumentDetails />} />
      <Route path=":documentId/transactions" element={<DocumentTransactions />} />
      <Route path="*" element={<Navigate to="list" />} />
    </Routes>
  );
};
