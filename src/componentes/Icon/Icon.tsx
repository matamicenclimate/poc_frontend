import clsx from 'clsx';

interface IconProps {
  id: string;
  alt?: string;
  png?: boolean;
  className?: string;
}

export const Icon = ({ id, png = false, alt, className }: IconProps) => {
  return (
    <img
      src={`/icons/bx-${id}.${png ? 'png' : 'svg'}`}
      alt={alt ?? id}
      className={clsx(className, 'fill-current text-primary')}
    />
  );
};
