import { useAuth } from '@/lib/auth';
import { ReactComponent as LogoDark } from '@/assets/logo-dark.svg';
import { ReactComponent as IconBell } from '@/assets/icons/bx-bell-line.svg';
import { ReactComponent as IconArrowDown } from '@/assets/icons/bx-arrow-down-simple-line.svg';
import { ReactComponent as IconWallet } from '@/assets/icons/bx-wallet-line.svg';
import { useTranslation } from 'react-i18next';
import { Link } from '@/componentes/Elements/Link/Link';
import { Profile } from '../Navbar/sections/Profile';
import Popover from '@/componentes/Popover/Popover';
import { useState } from 'react';

const linkStyle = 'flex items-center text-sm';

export const Navbar = () => {
  const auth = useAuth();
  const { t, i18n } = useTranslation();
  const [currency, setCurrency] = useState<string>('EUR');
  const [currentAmount, setAmount] = useState<string>('');

  const walletOptions = [
    { name: 'Wallet', account: '(0x54d4mmhrt4ssads0gknhd)', amount: '112,65 CC' },
    { name: 'Inditex', account: '(0x3245gkrt40gknghdsafdsd)', amount: '54.765,65 CC' },
  ];

  const languageOptions = [
    { name: `🇺🇸 ${t('components.Navbar.i18n.english')}`, key: 'en' },
    { name: `🇪🇸 ${t('components.Navbar.i18n.spanish')}`, key: 'es' },
    { name: `🇫🇷 ${t('components.Navbar.i18n.french')}`, key: 'fr' },
  ];

  const currencyOptions = [
    { name: 'EUR' },
    { name: 'USD' },
    { name: 'GPB' },
    { name: 'JPY' },
    { name: 'BTC' },
  ];

  return (
    <div className="mx-auto w-full border pb-5 pt-5">
      <div className="mx-auto flex">
        <div className="mr-10 pl-20">
          <Link to="/">
            <LogoDark />
          </Link>
        </div>
        <div className="flex w-full justify-between">
          <div className="flex gap-8">
            <Link to="/home" className={`text-neutral-2 ${linkStyle}`}>
              Home
            </Link>
            <Link to="/coins/buy" className={`text-neutral-4 ${linkStyle}`}>
              Buy
            </Link>
            <Link to="/sell" className={`text-neutral-4 ${linkStyle}`}>
              Sell
            </Link>
            <Link to="/about-us" className={`text-neutral-4 ${linkStyle}`}>
              About us
            </Link>
            {auth.user && (
              <Link to="/documents/upload" className={`text-primary ${linkStyle}`}>
                Developer
              </Link>
            )}
          </div>
          {auth.user && (
            <div className="flex gap-8 pr-20">
              <div className="flex items-center">
                <Popover>
                  <Popover.Button>
                    <div className="flex">
                      <button className="text-sm font-bold uppercase hover:bg-blue-100">
                        {i18n.language} / {currency}
                      </button>
                      <IconArrowDown />
                    </div>
                  </Popover.Button>
                  <Popover.Panel>
                    <div className="grid grid-cols-2 place-content-center ">
                      <div className="border-r pr-4 text-sm text-neutral-4">
                        <p className="pb-1.5 text-xs">{t('components.Navbar.i18n.title')}</p>
                        {languageOptions.map((lang, i) => {
                          return (
                            <div key={i} className="border-b last:border-none">
                              <Popover.Option
                                isActive={i18n.language === lang.key}
                                name={lang.name}
                                onClick={() => {
                                  i18n.changeLanguage(lang.key);
                                }}
                              />
                            </div>
                          );
                        })}
                      </div>
                      <div className="w-36 pl-4 text-sm text-neutral-4">
                        <p className="pb-1.5 text-xs">{t('components.Navbar.currency')}</p>
                        {currencyOptions.map((curr, i) => {
                          return (
                            <div key={i} className="border-b last:border-none">
                              <Popover.Option
                                name={curr.name}
                                isActive={currency === curr.name}
                                icon={<div className={'h-2 w-2 rounded-full bg-neutral-4'}></div>}
                                onClick={() => {
                                  setCurrency(curr.name);
                                }}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </Popover.Panel>
                </Popover>
              </div>
              <Link to="/notifications" className={`text-neutral-4 ${linkStyle}`}>
                <IconBell />
              </Link>

              <div className="flex items-center">
                <Popover>
                  <Popover.Button>
                    <div className="flex rounded-full border-2 border-solid border-neutral-6 px-4 py-3">
                      <div className="flex flex-row">
                        <button className="flex flex-row text-sm font-bold text-neutral-2 hover:bg-blue-100">
                          <p className={'font-bold'}>Wallet</p>
                          {currentAmount && (
                            <p className={'ml-1 text-sm font-normal text-primary'}>
                              {`(${currentAmount})`}
                            </p>
                          )}
                        </button>
                      </div>
                      <IconArrowDown />
                    </div>
                  </Popover.Button>
                  <Popover.Panel>
                    <div>
                      <div className="pr-4 text-sm text-neutral-4">
                        {walletOptions.map((option, i) => {
                          return (
                            <div key={i} className="border-b last:border-none">
                              <Popover.Wallet
                                name={option.name}
                                isActive={currentAmount === option.amount}
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
                                onClick={() => {
                                  setAmount(option.amount);
                                }}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </Popover.Panel>
                </Popover>
              </div>
              <Profile />
            </div>
          )}

          {!auth.user && (
            <div className="mr-20 flex flex-row gap-3">
              <Link to="/auth/login" className={linkStyle}>
                login
              </Link>
              <Link to="/auth/register" className={linkStyle}>
                register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
