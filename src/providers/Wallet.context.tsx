import { useGetBalance } from '@/features/wallet/api/useGetBalance';
import { magiclink } from '@/lib/magiclink';
import { createContext, useContext, useEffect, useState, ReactElement } from 'react';
import { UseQueryResult } from 'react-query';
import { IndexerAccount } from '@/features/wallet/api';

interface Context {
  account: UseQueryResult<IndexerAccount, unknown>;
}

const WalletContext = createContext<Context | null>(null);

interface ProviderProps {
  children: ReactElement;
}

export const WalletProvider = ({ children }: ProviderProps) => {
  const [wallet, setWallet] = useState<string | null>(null);

  const account = useGetBalance(wallet);

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

  const usdcDecimalPlaces = 1000000; // 6 decimal places
  const usdcBalance = () =>
    getAssetBalance(Number(process.env.REACT_APP_USDC_ASA_ID)) / usdcDecimalPlaces;

  const climatecoinBalance = () =>
    getAssetBalance(Number(process.env.REACT_APP_CLIMATECOIN_ASA_ID));

  const getAssetBalance = (assetId: number) => {
    if (!account.data) return 0;
    if (!account.data.account.assets) return 0;

    const assetData = account.data.account.assets.filter((asset) => asset['asset-id'] === assetId);

    if (assetData.length !== 1) return 0;

    return assetData[0].amount;
  };

  return { account: account.data?.account, usdcBalance, climatecoinBalance };
};
