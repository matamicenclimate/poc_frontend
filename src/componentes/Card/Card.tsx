type CardProps = {
  children?: React.ReactNode;
};

export const Card = ({ children }: CardProps) => {
  return <div className="w-full rounded-2xl border p-8 shadow-lg">{children}</div>;
};
