import clsx from 'clsx';

const base = 'rounded-md';

const sizes = {
  sm: 'p-1',
  md: 'p-2',
  lg: 'p-3',
};

const variants = {
  light: 'text-white bg-secondary',
  primary: 'text-white bg-blue-600',
};

type ButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
  type?: 'submit';
  size?: keyof typeof sizes;
  variant?: keyof typeof variants;
};

export const Button = ({ onClick, size = 'md', variant = 'primary', ...props }: ButtonProps) => {
  return (
    <button onClick={onClick} className={clsx(base, sizes[size], variants[variant])} {...props} />
  );
};
