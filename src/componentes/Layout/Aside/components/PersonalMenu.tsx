import { useTranslation } from 'react-i18next';

export const PersonalMenu = () => {
  const { t } = useTranslation();

  const personalMenu = [
    {
      icon: 'user-line',
      activeIcon: 'user-line-primary',
      label: t('documents.Upload.profile'),
      to: '/profile',
    },
    {
      icon: 'email-line',
      activeIcon: 'email-line-primary',
      label: t('documents.Upload.notifications'),
    },
    {
      icon: 'wallet-line',
      activeIcon: 'wallet-line-primary',
      label: t('documents.Upload.wallet'),
      to: '/wallet',
    },
  ];

  return personalMenu;
};
