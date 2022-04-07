import Popover from '@/componentes/Popover/Popover';
import { useWalletContext } from '@/providers/Wallet.context';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@/componentes/Icon/Icon';
import { useTranslation } from 'react-i18next';

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
          <button className="flex items-center rounded-full border-2 border-solid border-neutral-6 px-4 py-3 hover:bg-neutral-8">
            <div className="flex text-sm font-bold text-neutral-2 ">
              <span className={'font-bold'}>{t('components.Navbar.wallet.wallet')}</span>
              <span className={'ml-1 text-sm font-normal text-primary'}>{`(${t('intlNumber', {
                val: climatecoinBalance(),
              })} CC)`}</span>
            </div>
            <Icon id="arrow-down-simple-line" className="h-6 w-6" />
          </button>
        </Popover.Button>
        <Popover.Panel>
          <div className="text-sm text-neutral-4">
            {walletOptions.map((option, i) => {
              return (
                <div key={i} className="border-b last:border-none">
                  <Popover.Wallet
                    name={option.name}
                    isActive={true}
                    account={option.account}
                    amount={option.amount}
                    onClick={() => {
                      navigate(`/wallet/${option.address}`);
                    }}
                    icon={
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-6">
                        <Icon id="wallet-line" className="h-6 w-6" />
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
