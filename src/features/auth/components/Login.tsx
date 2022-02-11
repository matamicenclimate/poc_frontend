import { Button } from '@/componentes/Elements/Button/Button';
import { Form } from '@/componentes/Form/Form';
import { Input } from '@/componentes/Form/Inputs';
import { MainLayout } from '@/componentes/Layout/MainLayout';
import { useAuth } from '@/lib/auth';

export const Login = () => {
  const auth = useAuth();

  const handleLogin = async (data: Record<string, any>) => {
    console.log(data);

    await auth.login({ email: data.email });
  };

  return (
    <MainLayout>
      ola k ase
      <Form onSubmit={handleLogin} className="flex flex-col">
        <label htmlFor="email">email</label>
        <Input name="email" type="email" />
        <Button type="submit">hasme login</Button>
      </Form>
    </MainLayout>
  );
};
