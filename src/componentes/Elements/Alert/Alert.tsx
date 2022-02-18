import clsx from 'clsx';

const base = 'p-3 flex gap-2';

const type: any = {
  error: 'bg-red-700 text-white',
};

export const Alert = ({ style, options, message, close }: any) => (
  <div style={style} className={clsx(base, type[options.type])}>
    <div>
      {options.type === 'info' && '!'}
      {options.type === 'success' && ':)'}
      {options.type === 'error' && ':('}
    </div>
    <div>{message}</div>
    <button onClick={close}>X</button>
  </div>
); // optional configuration
