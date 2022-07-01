import { Suspense } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import { Spinner } from '@/componentes/Elements/Spinner/Spinner';
import { MainLayout } from '@/componentes/Layout/MainLayout';

import { useGetCompensations } from '../api/getCompensations';
import { CompensationHistory } from '../components/CompensationHistory';
import { Compensate } from '../pages/Compensate';
import { CompensationDetails } from '../pages/Details';

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
  const compensations = useGetCompensations();
  return (
    <Routes>
      <Route path="/" element={<CoinsWrapper />}>
        <Route path="compensate" element={<Compensate />} />
        <Route path="compensate/:compensationId" element={<CompensationDetails />} />
        <Route path="compensate/history" element={<CompensationHistory data={compensations} />} />
        <Route path="*" element={<Navigate to="compensate" />} />
      </Route>
    </Routes>
  );
};
