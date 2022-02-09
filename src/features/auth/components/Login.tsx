import { MainLayout } from '@/componentes/Layout/MainLayout';
import { useAuth } from '@/lib/auth';

export const Login = () => {
  const auth = useAuth();

  const handleLogin = () => {
    auth.login({ name: { first: 'pablo', last: 'motos' } } as any);
  };

  return (
    <MainLayout>
      ola k ase
      <button onClick={handleLogin}>hasme login</button>
    </MainLayout>
  );
};
