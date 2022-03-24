import { useCallback } from 'react';
import Popover from '@/componentes/Popover/Popover';
import { ReactComponent as IconWallet } from '@/assets/icons/bx-wallet-line.svg';
import { ReactComponent as IconArrowDown } from '@/assets/icons/bx-arrow-down-simple-line.svg';
import { useWalletContext } from '@/providers/Wallet.context';

export const WalletNav = () => {
  const { account, totalUsdc } = useWalletContext();

  const walletOptions = useCallback(
    () => [
      {
        name: 'Wallet',
        account: account.data
          ? `${account.data?.account.address?.slice(0, 10)}...${account.data.account.address?.slice(
              -10
            )}`
          : '',
        amount: `112,65 CC - ${totalUsdc()} USDC`,
      },
    ],
    [account.data]
  );

  return (
    <div className="flex items-center">
      <Popover>
        <Popover.Button>
          <button className="flex rounded-full border-2 border-solid border-neutral-6 px-4 py-3 hover:bg-neutral-8">
            <div className="flex text-sm font-bold text-neutral-2 ">
              <span className={'font-bold'}>Wallet</span>
              <span
                className={'ml-1 text-sm font-normal text-primary'}
              >{`(${totalUsdc()} USDC)`}</span>
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
                    account={option.account}
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
