import auth from './auth';
import compensations from './compensations';
import currency from './currency';
import info from './info';

export const handlers = [...auth, ...currency, ...info, ...compensations];
