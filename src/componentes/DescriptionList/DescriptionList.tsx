import clsx from 'clsx';

type DlProps = {
  children: React.ReactChild | React.ReactChild[];
  wrapperClassName?: string;
};
export const Dl = ({ children, wrapperClassName }: DlProps) => {
  return (
    <dl
      className={clsx(
        wrapperClassName,
        'grid grid-cols-2 gap-4 rounded-xl border p-6 text-sm text-neutral-4'
      )}
    >
      {children}
    </dl>
  );
};

const dtClassName = '';
const ddClassName = 'font-bold text-neutral-2';
type DlItemProps = {
  dt: string;
  dtClassNames?: string;
  dd: string | string[];
  ddClassNames?: string;
  wrapperClassName?: string;
  fullWidth?: boolean;
};
export const DlItem = ({ dt, dtClassNames, dd, ddClassNames, fullWidth = false }: DlItemProps) => {
  return (
    <div className={clsx(fullWidth && 'md:col-span-2')}>
      <dt className={clsx(dtClassName, dtClassNames)}>{dt}</dt>
      {!Array.isArray(dd) ? (
        <dd className={clsx(ddClassName, ddClassNames)}>{dd}</dd>
      ) : (
        dd.map((entry) => (
          <dd key={entry} className={clsx(ddClassName, ddClassNames)}>
            {entry}
          </dd>
        ))
      )}
    </div>
  );
};
