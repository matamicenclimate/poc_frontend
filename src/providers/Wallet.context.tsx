import { getBalance } from '@/features/wallet/api/getBalance';
import { magiclink } from '@/lib/magiclink';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { UseQueryResult } from 'react-query';

interface Context {
  account: UseQueryResult<any, any>;
}

const WalletContext = createContext<Context | null>(null);

interface ProviderProps {
  children: React.ReactNode;
}

export const WalletProvider = ({ children }: ProviderProps) => {
  const [wallet, setWallet] = useState<string | null>(null);

  const account = getBalance(wallet);

  useEffect(() => {
    const onMount = async () => {
      const publicAddress = await magiclink.algorand.getWallet();
      setWallet(publicAddress);
    };
    onMount();
  }, []);

  return <WalletContext.Provider value={{ account }}>{children}</WalletContext.Provider>;
};

export const useWalletContext = () => {
  const ctx = useContext(WalletContext);
  if (!ctx) {
    throw new Error('useWalletContext must be used within a WalletContextProvider');
  }
  const { account } = ctx;

  const usdcBalance = useCallback(
    () => getAssetBalance(Number(process.env.REACT_APP_USDC_ASA_ID)),
    [account.data]
  );

  const climatecoinBalance = useCallback(
    () => getAssetBalance(Number(process.env.REACT_APP_CLIMATECOIN_ASA_ID)),
    [account.data]
  );

  const getAssetBalance = (assetId: number) => {
    if (!account.data) return 0;
    if (!account.data.account.assets) return 0;

    const usdcData = account.data.account.assets.filter(
      (asset: any) => asset['asset-id'] === assetId
    );

    if (usdcData.length !== 1) return 0;

    return (usdcData[0].amount / 1000000).toFixed(2);
  };

  return { account, usdcBalance, climatecoinBalance };
};
