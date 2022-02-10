import { Form } from '@/componentes/Form/Form';
import { Input } from '@/componentes/Form/Inputs';
import { MainLayout } from '@/componentes/Layout/MainLayout';
import { useAuth } from '@/lib/auth';

export const Login = () => {
  const auth = useAuth();

  const handleLogin = (data: any) => {
    console.log(data);
    auth.login({ name: { first: 'pablo', last: 'motos' } } as any);
  };

  return (
    <MainLayout>
      ola k ase
      <Form onSubmit={handleLogin} className="flex flex-col">
        <label htmlFor="email">email</label>
        <Input name="email" type="email" />
        <button type="submit">hasme login</button>
      </Form>
    </MainLayout>
  );
};
