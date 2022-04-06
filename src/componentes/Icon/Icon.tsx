import styles from './Icon.module.css';
import clsx from 'clsx';

interface IconProps {
  id: string;
  png?: boolean;
  className?: string;
}

export const Icon = ({ id, png = false, className }: IconProps) => {
  return (
    <img
      src={`/icons/bx-${id}.${png ? 'png' : 'svg'}`}
      className={clsx(className, 'fill-current text-primary')}
    />
  );
};
