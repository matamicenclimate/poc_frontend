import clsx from 'clsx';

type CardProps = {
  children?: React.ReactNode;
  padding?: keyof typeof spacings;
  rounded?: keyof typeof border;
  shadow?: boolean;
};

const spacings = {
  xs: 'p-2',
  sm: 'p-4',
  default: 'p-8',
};

const border = {
  sm: 'rounded-lg',
  default: 'rounded-2xl',
};

export const Card = ({
  children,
  rounded = 'default',
  padding = 'default',
  shadow = true,
}: CardProps) => {
  return (
    <div
      className={clsx('w-full border', shadow && 'shadow-lg', spacings[padding], border[rounded])}
    >
      {children}
    </div>
  );
};
