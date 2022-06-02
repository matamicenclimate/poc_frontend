import clsx from 'clsx';
import { NavLink, Link as RouterLink, To } from 'react-router-dom';
import { ButtonStyleProps, buttonStyles } from '../Button/Button';
import { TFunctionResult } from 'i18next';

type BaseProps = {
  as?: string;
  className?: string;
  children?: React.ReactElement | string | TFunctionResult;
  navLink?: boolean;
} & ({
  as?: 'button';
} & ButtonStyleProps);

// Button props
type RouterLinkProps = {
  to?: string;
  href?: undefined;
  navLink?: boolean;
} & BaseProps;

// Anchor props
type AnchorProps = {
  to?: undefined;
  href?: string;
  target?: string;
  navLink?: undefined;
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
  navLink = false,
  className,
  ...props
}: RouterLinkProps | AnchorProps) => {
  const getClassName = (isActive?: boolean) => {
    if (as === 'button') {
      return clsx(
        'inline-flex',
        className,
        buttonStyles.base,
        buttonStyles.sizes[size ?? 'md'],
        buttonStyles.variants[variant ?? 'primary']
      );
    }
    return clsx(`text-primary`, isActive && 'underline', navLink ? '' : 'underline', className);
  };

  // anchor render
  if (hasHref(props)) {
    return (
      <a className={getClassName()} target={props.target ?? '_blank'} {...props}>
        <>
          {iconLeft} {children} {iconRight}
        </>
      </a>
    );
  }

  // button render
  if (!navLink) {
    return (
      <RouterLink to={props.to as To} className={getClassName()} {...props}>
        <>
          {iconLeft}
          {children}
          {iconRight}
        </>
      </RouterLink>
    );
  }
  return (
    <NavLink to={props.to as To} className={({ isActive }) => getClassName(isActive)} {...props}>
      <>
        {iconLeft}
        {children}
        {iconRight}
      </>
    </NavLink>
  );
};
