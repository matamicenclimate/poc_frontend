import { MainLayout } from '@/componentes/Layout/MainLayout';
import { useAuth } from '@/lib/auth';
import { magiclink } from '@/lib/magiclink';
import storage from '@/utils/storage';
import { useEffect, useState } from 'react';

export const Profile = () => {
  const { user } = useAuth();
  const [toke, setToken] = useState<string>('');
  const [wallet, setWallet] = useState<string>('');
  useEffect(() => {
    const onMount = async () => {
      const jwt = await magiclink.user.getIdToken();
      setToken(jwt);
      const publicAddress = await magiclink.algorand.getWallet();
      setWallet(publicAddress);
      console.log('algorand public address', publicAddress);
    };
    onMount();
  }, []);
  return (
    <MainLayout>
      <h1>profile</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <div>Algo Wallet Addr: {wallet}</div>
      <p className="break-all">{storage.getToken()}</p>
      <p className="break-all">{toke}</p>
    </MainLayout>
  );
};
