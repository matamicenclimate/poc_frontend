import { Popover, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Link } from '../Link/Link';

export type MenuOptions = {
  name: string;
  description?: string;
  icon?: string | React.ReactNode;
  href: string;
  onClick?: () => void;
};

interface DropdownProps {
  children?: string | React.ReactNode;
  label: string | React.ReactNode;
  options?: MenuOptions[];
}

export const Dropdown = ({ label, options, children }: DropdownProps) => {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button>
            <span>{label}</span>
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute left-1/2 z-10 mt-3 mr-40 min-w-max -translate-x-1/2 transform px-4 py-3">
              <div className="overflow-hidden rounded-lg bg-white px-4 py-3 shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative grid gap-8 rounded  bg-white p-1">
                  {options?.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="-m-3 flex items-center rounded-lg p-2 align-top transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    >
                      <div className="flex h-4 w-4 flex-shrink-0 items-center  text-white"></div>
                      <div className="ml-3.5">
                        <p className="mb-1 text-sm font-medium text-gray-900">{item.name}</p>
                        <p className="mb- text-sm text-gray-500">{item.description}</p>
                      </div>
                    </Link>
                  ))}
                  {children}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};
