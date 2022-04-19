import Popover from '@/componentes/Popover/Popover';
import { useWalletContext } from '@/providers/Wallet.context';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@/componentes/Icon/Icon';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import styles from '@/componentes/Layout/Navbar/sections/shared.module.css';

export const WalletNav = () => {
  const { account, usdcBalance, climatecoinBalance } = useWalletContext();
  const { t } = useTranslation();

  const walletOptions = [
    {
      name: t('components.Navbar.wallet.wallet'),
      account: account ? `${account.address?.slice(0, 10)}...${account.address?.slice(-10)}` : '',
      address: account?.address,
      amount: `${t('intlNumber', { val: climatecoinBalance() })} CC - ${t('intlNumber', {
        val: usdcBalance(),
      })} USDC`,
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="flex items-center">
      <Popover>
        <Popover.Button>
          <button
            className={clsx(styles.button, 'border-2 border-solid border-neutral-6 px-3.5 pl-5')}
          >
            <div className="flex space-x-1 text-sm font-bold text-neutral-2">
              <span>{t<string>('components.Navbar.wallet.wallet')}</span>
              <span className="font-normal text-primary">{`(${t('intlNumber', {
                val: climatecoinBalance(),
              })} CC)`}</span>
            </div>
            <Icon id="arrow-down-simple-line" className="h-6 w-6" />
          </button>
        </Popover.Button>
        <Popover.Panel className="p-2">
          <div className="divide-x text-sm text-neutral-4">
            {walletOptions.map((option, i) => {
              return (
                <Popover.Wallet
                  name={option.name}
                  isActive={true}
                  account={option.account}
                  amount={option.amount}
                  onClick={() => {
                    navigate(`/wallet/${option.address}`);
                  }}
                  key={i}
                  icon={
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-6">
                      <Icon id="wallet-line" className="h-6 w-6" />
                    </div>
                  }
                />
              );
            })}
          </div>
        </Popover.Panel>
      </Popover>
    </div>
  );
};
