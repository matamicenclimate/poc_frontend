import clsx from 'clsx';

type CardProps = {
  children?: React.ReactNode;
  padding?: keyof typeof spacings;
  shadow?: boolean;
};

const spacings = {
  xs: 'p-2',
  sm: 'p-4',
  default: 'p-8',
};

export const Card = ({ children, padding = 'default', shadow = true }: CardProps) => {
  return (
    <div className={clsx('w-full rounded-2xl border', shadow && 'shadow-lg', spacings[padding])}>
      {children}
    </div>
  );
};
