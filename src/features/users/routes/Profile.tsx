import { MainLayout } from '@/componentes/Layout/MainLayout';
import { useAuth } from '@/lib/auth';

export const Profile = () => {
  const { user } = useAuth();

  return (
    <MainLayout>
      profile
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </MainLayout>
  );
};
