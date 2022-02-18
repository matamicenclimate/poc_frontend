import { magiclink } from '@/lib/magiclink';
import { useEffect } from 'react';
import { Spinner } from '@/componentes/Elements/Spinner/Spinner';
import { MainLayout } from '@/componentes/Layout/MainLayout';
import { useAuth } from '@/lib/auth';
import { useTranslation } from 'react-i18next';
import { useAlert } from 'react-alert';

export const Callback = () => {
  const auth = useAuth();
  const alert = useAlert();
  const { t } = useTranslation();
  useEffect(() => {
    const onMount = async () => {
      try {
        /* Complete the "authentication callback" */
        await magiclink.auth.loginWithCredential();

        /* Get user metadata including email */
        const userMetadata = await magiclink.user.getMetadata();
        console.log({ userMetadata });
        await auth.refetchUser();
      } catch (e: any) {
        alert.error(t('auth.Callback.error'));
        setTimeout(() => {
          window.location.assign(window.location.origin as unknown as string);
        }, 3000);
      }
    };
    onMount();
  }, []);

  return (
    <MainLayout>
      <div className="h-[400px] flex flex-col gap-4 justify-center items-center">
        <Spinner />
        <p>{t('auth.Callback.logingIn')}</p>
      </div>
    </MainLayout>
  );
};
