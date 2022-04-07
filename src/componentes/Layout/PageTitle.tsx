import { useTranslation } from 'react-i18next';
import { Link } from '../Elements/Link/Link';
import { Title } from '../Elements/Title/Title';

type PageTitleProps = {
  title: string;
  description: string;
  linkTo?: string;
  link?: any;
};
export const PageTitle = ({ title, description, linkTo, link }: PageTitleProps) => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center py-12">
      <div className="flex-grow">
        <Title size={2} as={1}>
          {title}
        </Title>
      </div>
      <div className="word-break max-w-[300px] text-sm text-neutral-4">{description}</div>
      {link ? (
        link
      ) : (
        <Link to={linkTo} className="text-bold">
          {t('components.layout.PageTitle.viewMore')} {'>'}
        </Link>
      )}
    </div>
  );
};
