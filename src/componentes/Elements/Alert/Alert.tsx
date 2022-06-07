import clsx from 'clsx';

import { ReactComponent as CheckIcon } from '@/assets/icons/bx-check-line.svg';

const base = 'p-3 flex gap-2 rounded-md items-center';

const type: any = {
  error: 'bg-red-700 text-white',
  success: 'bg-primary-green text-white',
};

export const Alert = ({ style, options, message, close }: any) => (
  <div style={style} className={clsx(base, type[options.type])}>
    <div>
      {options.type === 'info' && '!'}
      {options.type === 'success' && <CheckIcon />}
      {options.type === 'error' && ':('}
    </div>
    <div>{message}</div>
    {/*<button onClick={close}>x</button>*/}
  </div>
); // optional configuration
