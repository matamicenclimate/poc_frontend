import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Link } from '@/componentes/Elements/Link/Link';
import { Icon } from '@/componentes/Icon/Icon';
import { useAuth } from '@/lib/auth';

const baseAsideLiStyles =
  'flex cursor-pointer items-center text-neutral-4 px-6 py-2 transition hover:bg-neutral-7 hover:text-primary';

const linkStyle = 'no-underline';

export const Aside = () => {
  const { user } = useAuth();
  const { t } = useTranslation();

  const methods = useForm<any>({
    mode: 'onBlur',
  });

  const getProfileAvatar = () => {
    if (user?.avatar?.url) {
      return user?.avatar.url;
    }
    return 'avatar-placeholder.jpg';
  };

  return (
    <aside className="text-sm text-neutral-4">
      <img src={getProfileAvatar()} className="h-32 rounded-full" />
      <div className="mb-4 mt-8 flex flex-col capitalize ">
        <div className="text-2xl  text-black">
          {t('documents.Upload.hi')}
          {user?.username?.split('@')[0]} 👋🏻
        </div>
        <div className="mt-2 text-lg text-neutral-5">
          {user?.type}
          {user?.country?.name && `, ${user.country.name}`}
        </div>
      </div>
      <hr />
      <ul className="my-2 space-y-1">
        <li
          className={clsx(
            baseAsideLiStyles,
            methods.getValues('status') === 'accepted' && 'text-primary'
          )}
          onClick={() => methods.setValue('status', 'accepted')}
        >
          <>
            <Icon
              id={`arrow-right-line${methods.getValues('status') === 'accepted' ? '-primary' : ''}`}
              className="mr-3 h-6 w-6 fill-primary"
            />{' '}
            {t('documents.Upload.buys')}
          </>
        </li>
        <li
          className={clsx(
            baseAsideLiStyles,
            methods.getValues('status') === 'completed' && 'text-primary'
          )}
          onClick={() => methods.setValue('status', 'completed')}
        >
          <>
            <Icon
              id={`arrow-right-line${
                methods.getValues('status') === 'completed' ? '-primary' : ''
              }`}
              className="mr-3 h-6 w-6 fill-primary"
            />{' '}
            {t('documents.Upload.sold')}
          </>
        </li>
        <Link to="/documents/list" className={clsx(linkStyle)}>
          <li
            className={clsx(
              baseAsideLiStyles,
              methods.getValues('status') === undefined && 'text-primary'
            )}
            onClick={() => methods.setValue('status', undefined)}
          >
            <>
              <Icon
                id={`shopping-bag${methods.getValues('status') === undefined ? '-primary' : ''}`}
                className="mr-3 h-6 w-6 fill-primary"
              />
              {t('documents.Upload.projects')}
            </>
          </li>
        </Link>
      </ul>
      <hr />
      <ul className="my-2 space-y-1">
        <Link to="/profile" className={clsx(linkStyle)}>
          <li className={baseAsideLiStyles}>
            <>
              <Icon id="user-line" className="mr-3 h-6 w-6" />
              {t('documents.Upload.profile')}
            </>
          </li>
        </Link>
        <li className={baseAsideLiStyles}>
          <>
            <Icon id="email-line" className="mr-3 h-6 w-6" />
            {t('documents.Upload.notifications')}
          </>
        </li>
        <Link to="/wallet/*" className={clsx(linkStyle)}>
          <li className={baseAsideLiStyles}>
            <>
              <Icon id="wallet-line" className="mr-3 h-6 w-6" />
              {t('documents.Upload.wallet')}
            </>
          </li>
        </Link>
      </ul>
    </aside>
  );
};
