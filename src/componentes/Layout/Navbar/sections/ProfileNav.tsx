import clsx from 'clsx';
import { useAuth } from '@/lib/auth';
import Popover from '@/componentes/Popover/Popover';
import { ReactComponent as IconCog } from '@/assets/icons/bx-cog-line2.svg';
import { ReactComponent as IconLogout } from '@/assets/icons/bx-logout.svg';
import { ReactComponent as IconLock } from '@/assets/icons/bx-lock-line.svg';
import { ReactComponent as IconUser } from '@/assets/icons/bx-user-line.svg';
import { ReactComponent as IconShare } from '@/assets/icons/bx-share-square.svg';
import { ReactComponent as IconBrightness } from '@/assets/icons/bx-brightness-line.svg';

export const ProfileNav = () => {
  const auth = useAuth();

  const handleLogout = () => {
    auth.logout();
  };

  const profileOptions = [
    {
      name: 'Profile',
      icon: <IconUser className={'h-5 w-5'} />,
      href: '/profile',
      description: 'Manage your profile',
    },
    {
      name: 'Payment methods',
      href: '/payment-methods',
      icon: <IconShare className={'h-5 w-5'} />,
      description: 'Manage your payment methods',
    },
    {
      name: 'Security',
      icon: <IconLock className={'h-5 w-5'} />,
      href: '/security',
      description: 'Manage your account security',
    },
    {
      name: 'Configuration',
      icon: <IconCog className={'h-5 w-5'} />,
      href: '/configuration',
      description: 'Set up your account and alerts',
    },

    {
      name: 'Promoter mode',
      icon: <IconBrightness className={'h-5 w-5'} />,
      href: '/documents/upload',
      description: 'Create your own credits',
    },
  ];

  return (
    <div className="flex items-center">
      <Popover>
        <Popover.Button>
          <div className="flex">
            <button className="text-sm font-bold uppercase hover:bg-blue-100">
              <img
                className="h-10 w-10 rounded-full"
                alt="100x100"
                src="https://mdbootstrap.com/img/Photos/Avatars/img%20(30).jpg"
                data-holder-rendered="true"
              />
            </button>
          </div>
        </Popover.Button>
        <Popover.Panel>
          <div>
            <div className="w-64 text-sm text-neutral-4">
              {profileOptions.map((option, i) => {
                return (
                  <div key={i} className="border-b last:border-none">
                    <Popover.Option
                      icon={<div className={'pr-1'}>{option.icon}</div>}
                      description={option.description}
                      name={option.name}
                      isActive
                      onClick={() => {
                        console.log('TO DO');
                      }}
                    />
                  </div>
                );
              })}

              <div
                onClick={handleLogout}
                role="button"
                tabIndex={0}
                key={'logout'}
                className={clsx(
                  'flex items-center border-neutral-6 px-2 py-1 pt-3 pb-3 font-alt  transition duration-150 ease-in-out'
                )}
              >
                <div className="pr-1">
                  <IconLogout className={'h-5 w-5'} />
                </div>
                <div className="pr-2">
                  <p className={clsx('px-2 font-normal text-neutral-3')}>Log out</p>
                </div>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Popover>
    </div>
  );
};
