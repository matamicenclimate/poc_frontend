import { useTranslation } from 'react-i18next';
import Popover from '@/componentes/Popover/Popover';
import { useCurrencyContext } from '@/providers/Currency.context';
import clsx from 'clsx';
import { Icon } from '@/componentes/Icon/Icon';

export const CurrencyNav = () => {
  const { t, i18n } = useTranslation();

  const currency = useCurrencyContext();

  const languageOptions = [
    { name: `🇺🇸 ${t('components.Navbar.i18n.english')}`, key: 'en' },
    { name: `🇪🇸 ${t('components.Navbar.i18n.spanish')}`, key: 'es' },
    { name: `🇫🇷 ${t('components.Navbar.i18n.french')}`, key: 'fr' },
    { name: `🇰🇷 ${t('components.Navbar.i18n.korean')}`, key: 'ko' },
  ];

  return (
    <div className="flex items-center">
      <Popover>
        <Popover.Button>
          <div className="flex">
            <button className="text-sm font-bold uppercase hover:bg-blue-100">
              {i18n.language} / {currency.state.currency}
            </button>
            <Icon id="arrow-down-simple-line" className="h-6 w-6" />
          </div>
        </Popover.Button>
        <Popover.Panel>
          <div className="grid grid-cols-2 place-content-center ">
            <div className="border-r pr-4 text-sm text-neutral-4">
              <p className="pb-1.5 text-xs">{t<string>('components.Navbar.i18n.title')}</p>
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
              <p className="pb-1.5 text-xs">{t<string>('components.Navbar.currency')}</p>
              {Object.keys(currency.currencies).map((curr: any, i) => {
                return (
                  <div key={i} className="border-b last:border-none">
                    <Popover.Option
                      name={curr}
                      isActive={currency.state.currency === curr}
                      icon={
                        <div
                          className={clsx(
                            'h-2 w-2 rounded-full',
                            currency.state.currency === curr ? 'bg-neutral-2' : 'bg-neutral-4'
                          )}
                        ></div>
                      }
                      onClick={() => {
                        currency.reducer.setCurrency(curr);
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
