import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Popover from '@/componentes/Popover/Popover';
import { ReactComponent as IconArrowDown } from '@/assets/icons/bx-arrow-down-simple-line.svg';

export const CurrencyNav = () => {
  const { t, i18n } = useTranslation();
  const [currency, setCurrency] = useState<string>('EUR');

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
  );
};
