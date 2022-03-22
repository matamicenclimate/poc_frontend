import { magiclink } from '@/lib/magiclink';
import { useEffect, useState } from 'react';
import Popover from '@/componentes/Popover/Popover';
import { ReactComponent as IconWallet } from '@/assets/icons/bx-wallet-line.svg';
import { ReactComponent as IconArrowDown } from '@/assets/icons/bx-arrow-down-simple-line.svg';
import { getBalance } from '@/features/wallet/api/getBalance';

export const WalletNav = () => {
  const [wallet, setWallet] = useState<string | null>(null);
  const [currentAmount, setAmount] = useState<string>('');
  const [walletName, setWalletName] = useState<string>('Wallet');

  const account = getBalance(wallet);

  const totalUsdc = () => {
    if (!account.data) return 0;
    console.log({ account: account.data, assets: account.data.account.assets });

    const usdcData = account.data.account.assets.filter(
      (asset: any) => asset['asset-id'] === Number(process.env.REACT_APP_USDC_ASA_ID)
    )[0];
    console.log({ usdcData });
    return (usdcData.amount / 1000000).toFixed(2);
  };

  useEffect(() => {
    const onMount = async () => {
      const publicAddress = await magiclink.algorand.getWallet();
      setWallet(publicAddress);
    };
    onMount();
  }, []);

  const walletOptions = () => [
    {
      name: 'Wallet',
      account: `${wallet?.slice(0, 10)}...${wallet?.slice(-10)}`,
      amount: `112,65 CC - ${totalUsdc()} USDC`,
    },
  ];

  return (
    <div className="flex items-center">
      <Popover>
        <Popover.Button>
          <button className="flex rounded-full border-2 border-solid border-neutral-6 px-4 py-3 hover:bg-neutral-8">
            <div className="flex text-sm font-bold text-neutral-2 ">
              <span className={'font-bold'}>{walletName}</span>
              {currentAmount && (
                <span
                  className={'ml-1 text-sm font-normal text-primary'}
                >{`(${currentAmount})`}</span>
              )}
            </div>
            <IconArrowDown />
          </button>
        </Popover.Button>
        <Popover.Panel>
          <div className="text-sm text-neutral-4">
            {walletOptions().map((option, i) => {
              return (
                <div key={i} className="border-b last:border-none">
                  <Popover.Wallet
                    name={option.name}
                    isActive={true}
                    account={option.account ?? ''}
                    amount={option.amount}
                    icon={
                      <div
                        className={
                          'flex h-10 w-10 items-center justify-center rounded-full bg-neutral-6'
                        }
                      >
                        <IconWallet />
                      </div>
                    }
                    onClick={() => {
                      setWalletName(option.name);
                      setAmount(option.amount);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </Popover.Panel>
      </Popover>
    </div>
  );
};
