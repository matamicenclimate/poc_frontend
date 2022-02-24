import { Link as RouterLink, To } from 'react-router-dom';

// Button props
type RouterLinkProps = {
  to?: string;
  href?: undefined;
  as?: 'button';
  children: React.ReactNode;
  className?: string;
};

// Anchor props
type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  to?: undefined;
  href?: string;
  as?: 'button';
  children: React.ReactNode;
  className?: string;
};

// Guard to check if href exists in props
const hasHref = (props: RouterLinkProps | AnchorProps): props is AnchorProps => 'href' in props;

// Component
export const Link = (props: RouterLinkProps | AnchorProps) => {
  // anchor render
  if (hasHref(props)) return <a {...props} />;
  // button render
  return <RouterLink to={props.to as To} {...props} />;
};
