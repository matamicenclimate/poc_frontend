import clsx from 'clsx';
import { Link as RouterLink, To } from 'react-router-dom';
import { ButtonStyleProps, buttonStyles } from '../Button/Button';

type BaseProps = {
  as?: string;
  className?: string;
  children?: React.ReactNode;
} & ({
  as?: 'button';
} & ButtonStyleProps);

// Button props
type RouterLinkProps = {
  to?: string;
  href?: undefined;
} & BaseProps;

// Anchor props
type AnchorProps = {
  to?: undefined;
  href?: string;
  target?: string;
} & BaseProps;

// Guard to check if href exists in props
const hasHref = (props: RouterLinkProps | AnchorProps): props is AnchorProps => 'href' in props;

// Component
// la discriminacion de TS no funciona bien con la destructuración
export const Link = ({
  as,
  size,
  variant,
  iconRight,
  iconLeft,
  children,
  ...props
}: RouterLinkProps | AnchorProps) => {
  const getClassName = () => {
    if (as === 'button') {
      return clsx(
        'inline-flex',
        buttonStyles.base,
        buttonStyles.sizes[size ?? 'md'],
        buttonStyles.variants[variant ?? 'primary']
      );
    }
    return 'text-primary underline';
  };

  // anchor render
  if (hasHref(props)) {
    return (
      <a className={getClassName()} target={props.target ?? '_blank'} {...props}>
        {iconLeft} {children} {iconRight}
      </a>
    );
  }

  // button render

  return (
    <RouterLink to={props.to as To} className={getClassName()} {...props}>
      {iconLeft}
      {children}
      {iconRight}
    </RouterLink>
  );
};
