import clsx from 'clsx';

export type PillProps = {
  children: React.ReactNode;
  style?: keyof typeof styles;
  variant?: keyof typeof variants;
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
};

const backgrounds = {
  comingSoon: 'bg-[#9757d7]',
  default: 'bg-[#23262f]',
  featured: 'bg-[#3772ff]',
  new: 'bg-[#ff6838]',
  popular: 'bg-[#58bd7d]',
};

const textColors = {
  comingSoon: 'text-[#9757d7]',
  default: 'text-[#23262f]',
  featured: 'text-[#3772ff]',
  new: 'text-[#ff6838]',
  popular: 'text-[#58bd7d]',
};

export const Pill = ({ children, style = 'solid', variant = 'default' }: PillProps) => {
  return (
    <div
      className={clsx(
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
