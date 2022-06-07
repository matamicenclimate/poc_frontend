import { useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useTranslation } from 'react-i18next';

import { Spinner } from '@/componentes/Elements/Spinner/Spinner';
import { MainLayout } from '@/componentes/Layout/MainLayout';
import { useAuth } from '@/lib/auth';
import { magiclink } from '@/lib/magiclink';

export const Callback = () => {
  const auth = useAuth();
  const alert = useAlert();
  const { t } = useTranslation();
  useEffect(() => {
    const onMount = async () => {
      /* Complete the "authentication callback" */
      await magiclink.auth
        .loginWithCredential()
        .then(() => auth.refetchUser())
        .catch((e) => {
          console.error(e);
          alert.error(t('auth.Callback.error'));
        });
      // setTimeout(() => {
      //   window.location.assign(window.location.origin as unknown as string);
      // }, 3000);
    };
    onMount();
  }, []);

  return (
    <MainLayout>
      <div className="flex h-[400px] flex-col items-center justify-center gap-4">
        <Spinner />
        <p>{t<string>('auth.Callback.logingIn')}</p>
      </div>
    </MainLayout>
  );
};
