import auth from './auth';
import currency from './currency';
import info from './info';

export const handlers = [...auth, ...currency, ...info];
