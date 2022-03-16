import { useAuth } from '@/lib/auth';
import { ReactComponent as LogoDark } from '@/assets/logo-dark.svg';
import { Link } from '@/componentes/Elements/Link/Link';
import { Dropdown } from '@/componentes/Elements/Dropdown/Dropdown';
import { Profile } from '../Navbar/sections/Profile';
import Popover from '@/componentes/Popover/Popover';
import { useTranslation } from 'react-i18next';

const linkStyle = 'flex items-center text-sm';

export const Navbar = () => {
  const auth = useAuth();
  const { t, i18n } = useTranslation();

  const walletOptions = [
    { name: 'Wallet', href: '/' },
    { name: 'Inditex', href: '/' },
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
                    <button className="uppercase hover:bg-blue-100">{i18n.language}/</button>
                  </Popover.Button>
                  <Popover.Panel>
                    <div className="grid grid-cols-2">
                      <div className="border-r">
                        <Popover.Option
                          name={`🇺🇸 ${t('components.Navbar.i18n.english')}`}
                          onClick={() => {
                            i18n.changeLanguage('en');
                          }}
                        />
                        <Popover.Option
                          name={`🇪🇸 ${t('components.Navbar.i18n.spanish')}`}
                          onClick={() => {
                            i18n.changeLanguage('es');
                          }}
                        />
                        <Popover.Option
                          name={`🇫🇷 ${t('components.Navbar.i18n.french')}`}
                          onClick={() => {
                            i18n.changeLanguage('fr');
                          }}
                        />
                      </div>
                      <div>
                        <Popover.Option
                          name="Write"
                          onClick={() => {
                            console.log('TODO:');
                          }}
                        />
                        <Popover.Option
                          name="Write"
                          onClick={() => {
                            console.log('TODO:');
                          }}
                        />
                      </div>
                    </div>
                  </Popover.Panel>
                </Popover>
              </div>
              <Link to="/notifications" className={`text-neutral-4 ${linkStyle}`}>
                Campanita
              </Link>

              <Dropdown label={'Wallet'} options={walletOptions} />
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
