import clsx from 'clsx';

const base = 'rounded-full font-bold disabled:opacity-75';

const sizes = {
  sm: 'min-w-78 min-h-10 px-4 py-3 text-sm',
  md: 'min-w-101 min-h-12 px-6 py-4 text-md',
};

const variants = {
  primary: 'text-black bg-primary',
  light: 'text-neutral-2 bg-neutral-6',
  dark: 'text-neutral-2 bg-neutral-6',
};

export const buttonStyles = { base, sizes, variants };

type ButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  type?: 'submit';
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
  ...props
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(base, sizes[size], variants[variant])}
      disabled={disabled}
      {...props}
    ></button>
  );
};
