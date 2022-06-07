import clsx from 'clsx';
import { useAuth } from '@/lib/auth';
import Popover from '@/componentes/Popover/Popover';
import { ReactComponent as IconCog } from '@/assets/icons/bx-cog-line2.svg';
import { ReactComponent as IconLogout } from '@/assets/icons/bx-logout.svg';
import { ReactComponent as IconLock } from '@/assets/icons/bx-lock-line.svg';
import { ReactComponent as IconShare } from '@/assets/icons/bx-share-square.svg';
import { ReactComponent as IconBrightness } from '@/assets/icons/bx-brightness-line.svg';
import { Switch as HLSwitch } from '@headlessui/react';
import { useUpdateUserType } from '@/componentes/Layout/Navbar/api/useUpdateUserType';
import { useState } from 'react';
import { Link } from '@/componentes/Elements/Link/Link';
import { Icon } from '@/componentes/Icon/Icon';
import { useTranslation } from 'react-i18next';
import styles from './shared.module.css';
import AvatarPlaceholder from '@/assets/images/avatar-placeholder.jpg';

export const ProfileNav = () => {
  const auth = useAuth();
  const updateType = useUpdateUserType();
  const { t } = useTranslation();
  const handleLogout = () => {
    auth.logout();
  };

  const profileOptions = [
    {
      name: t('components.ProfileNav.profile.title'),
      icon: <Icon id="user-line" className="h-5 w-5" />,
      href: '/profile',
      description: t('components.ProfileNav.profile.description'),
    },
    {
      name: t('components.ProfileNav.payment.title'),
      href: '/payment-methods',
      icon: <IconShare className={'h-5 w-5'} />,
      description: t('components.ProfileNav.payment.description'),
    },
    {
      name: t('components.ProfileNav.security.title'),
      icon: <IconLock className={'h-5 w-5'} />,
      href: '/security',
      description: t('components.ProfileNav.security.description'),
    },
    {
      name: t('components.ProfileNav.configuration.title'),
      icon: <IconCog className={'h-5 w-5'} />,
      href: '/configuration',
      description: t('components.ProfileNav.configuration.description'),
    },
  ];

  const [isDeveloper, setIsDeveloper] = useState(auth.user?.type === 'developer');

  const handleChange = async () => {
    if (!auth.user) return;
    if (updateType.isLoading) return;
    setIsDeveloper(!isDeveloper);
    const data = await updateType.mutateAsync({
      userId: auth.user?._id as string,
      type: auth.user?.type === 'developer' ? 'buyer' : 'developer',
    });
    setIsDeveloper(data.type === 'developer');
  };

  const getProfileAvatar = () => {
    if (auth.user?.avatar?.url) {
      return auth.user?.avatar.url;
    }
    return AvatarPlaceholder;
  };

  return (
    <div className="flex items-center">
      <Popover>
        <Popover.Button>
          <button className={clsx(styles.button)} style={{ padding: '6px' }}>
            <div
              style={{
                backgroundImage: `url(${getProfileAvatar()})`,
              }}
              className="h-10 w-10 rounded-full bg-cover bg-center"
              data-holder-rendered="true"
            />
          </button>
        </Popover.Button>
        <Popover.Panel className="p-2">
          <div className="w-64 divide-y text-sm text-neutral-4">
            {profileOptions.map((option) => (
              <Link key={option.name} to={option.href} className="block no-underline">
                <Popover.Option
                  icon={<div className={'flex h-full pr-1'}>{option.icon}</div>}
                  description={option.description}
                  name={option.name}
                  onClick={() => undefined}
                />
              </Link>
            ))}

            <div
              onClick={handleChange}
              role="button"
              tabIndex={0}
              className={clsx(styles.popover__option)}
            >
              <div className="pr-1">
                <IconBrightness className={'h-5 w-5'} />
              </div>
              <div className="flex w-full items-center">
                <div>
                  <p className={clsx('px-2 font-normal text-neutral-3')}>
                    {t<string>('components.ProfileNav.promoter')}
                  </p>
                  <p className={clsx('px-2 text-[10px] font-normal text-neutral-4')}>
                    {t<string>('components.ProfileNav.createYouCredits')}
                  </p>
                </div>
                <div className="flex-grow" />
                <div>
                  <HLSwitch.Group>
                    <div className="flex items-center">
                      <HLSwitch
                        checked={isDeveloper}
                        onChange={() => null}
                        className={`${
                          isDeveloper ? 'bg-blue-600' : 'bg-gray-200'
                        } relative inline-flex h-5 w-8 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                      >
                        <span
                          className={`${
                            isDeveloper ? 'translate-x-4' : 'translate-x-1'
                          } inline-block h-3 w-3 transform rounded-full bg-white transition-transform`}
                        />
                      </HLSwitch>
                    </div>
                  </HLSwitch.Group>
                </div>
              </div>
            </div>

            <div
              onClick={handleLogout}
              role="button"
              tabIndex={0}
              key={'logout'}
              className={clsx(styles.popover__option)}
            >
              <div className="pr-1">
                <IconLogout className={'h-5 w-5'} />
              </div>
              <div className={clsx('px-2 font-normal text-neutral-3')}>
                {t<string>('components.ProfileNav.logout')}
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Popover>
    </div>
  );
};
