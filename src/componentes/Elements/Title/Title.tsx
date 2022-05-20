import clsx from 'clsx';
import { TFunctionResult } from 'i18next';

type TitleProps = {
  size: 1 | 2 | 3 | 4 | 5;
  as?: 1 | 2 | 3 | 4 | 5;
  children: React.ReactNode | TFunctionResult;
  className?: string;
};

const styles = {
  1: 'text-[64px]',
  2: 'text-[48px]',
  3: 'text-[40px]',
  4: 'text-[32px]',
  5: 'text-[24px]',
};

export const Title = ({ size, as = undefined, children, className }: TitleProps) => {
  const Component: any = `h${as ?? size}`;
  return <Component className={clsx('font-bold', styles[size], className)}>{children}</Component>;
};
