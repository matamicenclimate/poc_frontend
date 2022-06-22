import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

import { Icon } from '@/componentes/Icon/Icon';

type AsideProps = {
  menu: menuProps[];
};

export type menuProps = {
  icon: string;
  activeIcon: string;
  label: string | React.ReactElement;
  listClassName?: string | boolean;
  iconClassName?: string | boolean;
  to?: string;
};

const baseAsideLiStyles = 'text-neutral-4 ';

const linkStyles = 'no-underline flex transition hover:bg-neutral-7 hover:text-primary px-6 py-2';

const iconStyles = 'mr-3 h-6 w-6';

export const Aside = ({ menu }: AsideProps) => {
  return (
    <>
      {menu && (
        <ul className="my-2 space-y-1">
          {menu.map((item) => {
            return (
              <li
                key={`${item.label}`}
                className={clsx(baseAsideLiStyles, item.listClassName && item.listClassName)}
              >
                <NavLink
                  to={item.to ?? '/*'}
                  className={({ isActive }) => clsx(linkStyles, isActive && 'text-neutral-4')}
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        id={isActive ? item.activeIcon : item.icon}
                        className={clsx(iconStyles, item.icon)}
                      />
                      {item.label && item.label}
                    </>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};
