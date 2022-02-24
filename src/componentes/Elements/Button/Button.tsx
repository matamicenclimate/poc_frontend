import clsx from 'clsx';

const base = 'rounded-md disabled:opacity-75';

const sizes = {
  sm: 'p-1',
  md: 'p-2',
  lg: 'p-3',
};

const variants = {
  light: 'text-white bg-secondary',
  primary: 'text-white bg-blue-600',
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
    />
  );
};
