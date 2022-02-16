import { Dialog } from '@/componentes/Dialog/Dialog';
import { Button } from '@/componentes/Elements/Button/Button';
import { Form } from '@/componentes/Form/Form';
import { Input } from '@/componentes/Form/Inputs';
import { MainLayout } from '@/componentes/Layout/MainLayout';
import { useAuth } from '@/lib/auth';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const Login = () => {
  const auth = useAuth();
  const { t } = useTranslation();

  const handleLogin = async (data: Record<string, any>) => {
    console.log(data);

    await auth.login({ email: data.email });
  };

  return (
    <MainLayout>
      <Form onSubmit={handleLogin} className="flex flex-col">
        <label htmlFor="email">{t('auth.Login.form.email')}</label>
        <Input name="email" type="email" />

        <Button type="submit">{t('auth.Login.login')}</Button>
      </Form>
    </MainLayout>
  );
};
