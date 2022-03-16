import { useAuth } from '@/lib/auth';
import { Dropdown } from '../../../Elements/Dropdown/Dropdown';

export const Profile = () => {
  const MenuLink = ({ text, action }: any) => {
    return <button onClick={action}>{text}</button>;
  };

  const auth = useAuth();

  const handleLogout = () => {
    auth.logout();
  };

  const profileOptions = [
    { name: 'Profile', href: '/profile', description: 'Manage your profile' },
    {
      name: 'Payment methods',
      href: '/payment-methods',
      description: 'Manage your payment methods',
    },
    { name: 'Security', href: '/security', description: 'Manage your account security' },
    {
      name: 'Configuration',
      href: '/configuration',
      description: 'Set up your account and alerts',
    },
    { name: 'Promoter mode', href: '/documents/upload', description: 'Create your own credits' },
  ];

  return (
    <Dropdown
      label={
        <img
          className="h-10 w-10 rounded-full"
          alt="100x100"
          src="https://mdbootstrap.com/img/Photos/Avatars/img%20(30).jpg"
          data-holder-rendered="true"
        />
      }
      options={profileOptions}
    >
      <MenuLink text="logout" className="bg-primary text-neutral-8" action={handleLogout} />
    </Dropdown>
  );
};
