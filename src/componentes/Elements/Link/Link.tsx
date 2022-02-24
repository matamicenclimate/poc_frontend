import clsx from 'clsx';
import { Link as RouterLink, To } from 'react-router-dom';
import { ButtonStyleProps, buttonStyles } from '../Button/Button';

type BaseProps = { as?: string; children: React.ReactNode; className?: string } & ({
  as?: 'button';
} & ButtonStyleProps);

// Button props
type RouterLinkProps = {
  to?: string;
  href?: undefined;
} & BaseProps;

// Anchor props
type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  to?: undefined;
  href?: string;
} & BaseProps;

// Guard to check if href exists in props
const hasHref = (props: RouterLinkProps | AnchorProps): props is AnchorProps => 'href' in props;

// Component
// la discriminacion de TS no funciona bien con la destructuración
export const Link = (props: RouterLinkProps | AnchorProps) => {
  const getClassName = () => {
    if (props.as === 'button') {
      return clsx(
        buttonStyles.base,
        buttonStyles.sizes[props.size ?? 'md'],
        buttonStyles.variants[props.variant ?? 'primary']
      );
    }
    return '';
  };
  // anchor render
  if (hasHref(props)) return <a className={getClassName()} {...props} />;
  // button render
  return <RouterLink to={props.to as To} className={getClassName()} {...props} />;
};
