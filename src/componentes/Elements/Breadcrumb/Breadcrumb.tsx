import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { Link } from '../Link/Link';

const baseStyle = 'flex gap-4 p-2 border';

type BreadcrumbProps = {
  links?: { to: string; label: string }[];
};
export const Breadcrumb = ({ links = [] }: BreadcrumbProps) => {
  const { t } = useTranslation();
  return (
    <ul className={clsx(baseStyle)}>
      <li>
        <Link to="/">{t('misc.Dashboard.title')}</Link>
      </li>
      {links.map((link, i) => (
        <li key={i} className="flex gap-4">
          <div>/</div>
          <Link to={link.to}>{link.label}</Link>
        </li>
      ))}
    </ul>
  );
};
