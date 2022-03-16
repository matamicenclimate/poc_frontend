import clsx from 'clsx';

const base = 'rounded-full font-bold disabled:opacity-50';

const sizes = {
  sm: 'px-4 py-3 text-sm',
  md: 'px-6 py-4 text-md',
};

const variants = {
  primary: clsx('text-neutral-8 bg-primary', 'hover:bg-accent-primary'),
  light: clsx(
    'text-neutral-2 bg-neutral-8 border-solid border-2 border-neutral-6',
    'hover:text-neutral-8 hover:bg-neutral-2 disabled:text-neutral-8 disabled:bg-neutral-2'
  ),
  dark: clsx(
    'text-neutral-2 bg-neutral-8 border-solid border-2 border-neutral-4',
    'hover:border-transparent disabled:border-transparent'
  ),
};

export const buttonStyles = { base, sizes, variants };

type ButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
  type?: 'submit';
  disabled?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
} & ButtonStyleProps;

export type ButtonStyleProps = {
  size?: keyof typeof sizes;
  variant?: keyof typeof variants;
};

export const Button = ({
  onClick,
  size = 'md',
  variant = 'primary',
  disabled = false,
  iconLeft,
  iconRight,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(base, sizes[size], variants[variant])}
      disabled={disabled}
      {...props}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
};
