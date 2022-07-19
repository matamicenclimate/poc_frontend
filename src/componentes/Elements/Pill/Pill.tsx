import clsx from 'clsx';

export type PillProps = {
  children: React.ReactNode;
  style?: keyof typeof styles;
  variant?: keyof typeof variants;
  className?: string;
};

const baseStyle = 'rounded p-1 uppercase text-xs font-bold';

const styles = {
  ghost: 'bg-white',
  solid: 'text-white',
};

const variants = {
  comingSoon: 'border-2 border-[#9757d7]',
  default: 'border-2 border-[#23262f]',
  featured: 'border-2 border-[#3772ff]',
  new: 'border-2 border-[#ff6838]',
  popular: 'border-2 border-[#58bd7d]',
  swap: 'border-2 border-[#364237]',
  danger: 'border-2 border-[#e24545]',
};

const backgrounds = {
  comingSoon: 'bg-[#9757d7]',
  default: 'bg-[#23262f]',
  featured: 'bg-[#3772ff]',
  new: 'bg-[#ff6838]',
  popular: 'bg-[#58bd7d]',
  swap: 'bg-[#364237]',
  danger: 'bg-[#e24545]',
};

const textColors = {
  comingSoon: 'text-[#9757d7]',
  default: 'text-[#23262f]',
  featured: 'text-[#3772ff]',
  new: 'text-[#ff6838]',
  popular: 'text-[#58bd7d]',
  swap: 'text-[#fcfcfd]',
  danger: 'text-[#3772ff]',
};

export const Pill = ({ className, children, style = 'solid', variant = 'default' }: PillProps) => {
  return (
    <div
      className={clsx(
        className,
        baseStyle,
        variants[variant],
        styles[style],
        style === 'solid' ? backgrounds[variant] : textColors[variant]
      )}
    >
      {children}
    </div>
  );
};
