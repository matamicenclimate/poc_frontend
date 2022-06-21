import { useTranslation } from 'react-i18next';

export const OperationsMenu = () => {
  const { t } = useTranslation();

  const operationsMenu = [
    {
      icon: `arrow-right-line`,
      activeIcon: `arrow-right-line-primary`,
      label: t('documents.Upload.buys'),
      to: '/documents/buys',
    },
    {
      icon: `arrow-right-line`,
      activeIcon: `arrow-right-line-primary`,
      label: t('documents.Upload.sold'),
      to: '/documents/sells',
    },
    {
      icon: `shopping-bag`,
      activeIcon: `shopping-bag-primary`,
      label: t('documents.Upload.projects'),
      to: '/documents/list',
    },
  ];

  return operationsMenu;
};
