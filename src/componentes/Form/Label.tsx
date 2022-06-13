import clsx from 'clsx';

type LabelProps = {
  name: string;
  label?: string;
  required?: boolean;
  labelClassName?: string;
};

export const Label = ({ name, label, required, labelClassName }: LabelProps) => {
  if (!label) return null;
  return (
    <label className={clsx('mb-2 text-xs text-neutral-4', labelClassName)} htmlFor={name} id={name}>
      {label}
      {!required && ' (optional)'}
    </label>
  );
};
