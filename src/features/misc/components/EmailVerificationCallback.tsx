import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { Spinner } from '@/componentes/Elements/Spinner/Spinner';
import { MainLayout } from '@/componentes/Layout/MainLayout';

import { useVerifyEmail } from '../api/useVerifyEmail';

export const EmailVerificationCallback = () => {
  const search = useLocation().search;
  const verifyEmail = useVerifyEmail();
  let isVerifying = false;

  useEffect(() => {
    const onMount = async () => {
      const token = new URLSearchParams(search).get('token');
      if (!token) return;
      await verifyEmail.mutateAsync(token);
    };
    if (isVerifying) return;
    isVerifying = true;
    onMount();
  }, []);

  return (
    <MainLayout>
      <div className="flex h-[400px] flex-col items-center justify-center gap-4">
        <Spinner />
        <p>{'Verifying email...'}</p>
      </div>
    </MainLayout>
  );
};
