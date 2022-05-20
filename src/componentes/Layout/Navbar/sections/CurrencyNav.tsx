import { useTranslation } from 'react-i18next';
import Popover from '@/componentes/Popover/Popover';
import { useCurrencyContext } from '@/providers/Currency.context';
import clsx from 'clsx';
import { Icon } from '@/componentes/Icon/Icon';
import styles from './shared.module.css';

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
          <div className={clsx(styles.button)}>
            <div>
              {i18n.language} / {currency.state.currency}
            </div>
            <Icon id="arrow-down-simple-line" className="h-6 w-6" />
          </div>
        </Popover.Button>
        <Popover.Panel>
          <div className="flex text-sm text-neutral-4">
            <div className="languageColumn w-32">
              <p className="pb-1.5 text-xs">{t<string>('components.Navbar.i18n.title')}</p>
              <div className="divide-y">
                {languageOptions.map((lang, i) => {
                  return (
                    <Popover.Option
                      isActive={i18n.language === lang.key}
                      name={lang.name}
                      onClick={() => {
                        i18n.changeLanguage(lang.key);
                      }}
                      key={i}
                    />
                  );
                })}
              </div>
            </div>
            <div className="mx-4 w-[1px] bg-neutral-7"></div>
            <div className="currencyColumn w-32">
              <p className="pb-1.5 text-xs">{t<string>('components.Navbar.currency')}</p>
              <div className="divide-y">
                {Object.keys(currency.currencies).map((curr, i) => {
                  return (
                    <Popover.Option
                      name={curr}
                      isActive={currency.state.currency === curr}
                      icon={
                        <div
                          className={clsx(
                            'h-2 w-2 rounded-full',
                            currency.state.currency === curr ? 'bg-primary-green' : 'bg-neutral-4'
                          )}
                        />
                      }
                      key={i}
                      onClick={() => {
                        currency.reducer.setCurrency(curr as any);
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Popover>
    </div>
  );
};
