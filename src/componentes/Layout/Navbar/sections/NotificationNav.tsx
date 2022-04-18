import { useTranslation } from 'react-i18next';
import Popover from '@/componentes/Popover/Popover';
import { Icon } from '@/componentes/Icon/Icon';
import { useGetNotifications } from '@/componentes/Layout/Navbar/api/useGetNotifications';
import { Spinner } from '@/componentes/Elements/Spinner/Spinner';
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInWeeks,
  parseJSON,
} from 'date-fns';
import { Link } from '@/componentes/Elements/Link/Link';
import clsx from 'clsx';
import { useMarkNotificationsAsRead } from '@/componentes/Layout/Navbar/api/useMarkNotificationsAsRead';
import React from 'react';

const modelToUrl: Record<string, string> = {
  'carbon-documents': 'documents',
};

const ConditionalWrapper = ({
  condition,
  wrapper,
  children,
}: {
  condition: boolean;
  wrapper: (children: React.ReactChildren) => React.ReactElement;
  children: any;
}) => (condition ? wrapper(children) : children);

export const NotificationNav = () => {
  const notifications = useGetNotifications();
  const markAsRead = useMarkNotificationsAsRead();
  const { t } = useTranslation();
  const renderNotifications = () => {
    if (notifications.data) {
      return (
        <div>
          <ul className="">
            {notifications.data.map((notification) => {
              const getDate = () => {
                if (differenceInWeeks(new Date(), parseJSON(notification.createdAt)) > 0) {
                  return `${differenceInWeeks(new Date(), parseJSON(notification.createdAt))}w`;
                } else if (differenceInDays(new Date(), parseJSON(notification.createdAt)) > 0) {
                  return `${differenceInDays(new Date(), parseJSON(notification.createdAt))}d`;
                } else if (differenceInHours(new Date(), parseJSON(notification.createdAt)) > 0) {
                  return `${differenceInHours(new Date(), parseJSON(notification.createdAt))}h`;
                }
                return `${differenceInMinutes(new Date(), parseJSON(notification.createdAt))}m`;
              };

              return (
                <li
                  key={notification._id}
                  className="flex items-center space-x-2 border-b py-1 text-sm last:border-b-0"
                >
                  <ConditionalWrapper
                    condition={!!notification.model}
                    wrapper={(children) => (
                      <Link
                        to={`/${modelToUrl[notification.model as string]}/${notification.model_id}`}
                        className="flex w-full items-center space-x-2 rounded py-2 px-1 text-neutral-4 no-underline hover:bg-neutral-7"
                      >
                        {children}
                      </Link>
                    )}
                  >
                    <div>
                      <div
                        className={clsx(
                          ' h-2 w-2 rounded-full',
                          notification.is_read ? 'bg-neutral-5' : 'bg-primary-green'
                        )}
                      />
                    </div>
                    <div className="flex-grow space-y-1 pl-1">
                      <div className="flex w-full justify-between">
                        <div className="font-medium">{notification.title}</div>
                        <div className="break-normal text-xs">{getDate()}</div>
                      </div>
                      <div className="text-xs text-neutral-5">{notification.description}</div>
                    </div>
                  </ConditionalWrapper>
                </li>
              );
            })}
          </ul>
        </div>
      );
    }
    if (notifications.error instanceof Error) {
      return <>{('An error has occurred: ' + notifications.error.message) as string}</>;
    }
    return (
      <div className="flex items-center justify-center p-4">
        <Spinner />
      </div>
    );
  };

  return (
    <div className="flex items-center">
      <Popover onClose={markAsRead.mutateAsync}>
        <Popover.Button>
          <button className="relative flex p-1">
            <Icon id="bell-line" className="h-7 w-7" />
            {notifications?.data
              ? notifications?.data?.filter((i) => !i.is_read).length > 0 && (
                  <div className="absolute right-0 top-0 h-3 w-3 rounded-full bg-primary-green" />
                )
              : null}
          </button>
        </Popover.Button>
        <Popover.Panel>
          <div className="w-96 space-y-3">
            <div className="flex justify-between text-xs text-neutral-4">
              <div>{t('components.Navbar.notifications.title')}</div>
              <div>
                <button
                  className="text-neutral-5"
                  onClick={() => markAsRead.mutateAsync()}
                  disabled={markAsRead.isLoading}
                >
                  {t('components.Navbar.notifications.clear')}
                </button>
              </div>
            </div>
            {renderNotifications()}
          </div>
        </Popover.Panel>
      </Popover>
    </div>
  );
};
