import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { Compensate } from '../pages/Compensate';
import { Suspense } from 'react';
import { MainLayout } from '@/componentes/Layout/MainLayout';
import { Spinner } from '@/componentes/Elements/Spinner/Spinner';

const CoinsWrapper = () => {
  return (
    <MainLayout>
      <Suspense
        fallback={
          <div className="flex h-full w-full items-center justify-center">
            <Spinner size="xl" />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </MainLayout>
  );
};

export const ClimatecoinsRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<CoinsWrapper />}>
        <Route path="compensate" element={<Compensate />} />
        <Route path="*" element={<Navigate to="compensate" />} />
      </Route>
    </Routes>
  );
};
