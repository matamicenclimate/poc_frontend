import React, {
  createContext,
  SyntheticEvent,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { Popover as HLPopover } from '@headlessui/react';
import { usePopper } from 'react-popper';
import { VirtualElement } from '@popperjs/core';
import { ReactComponent as IconDots } from '@/assets/icons/bx-dots-vertical.svg';

import * as PopperJS from '@popperjs/core';
import clsx from 'clsx';

type ICompoundComponent = {
  Option: React.FC<PopoverOptionsProps>;
  Wallet: React.FC<PopoverWalletProps>;
  Button: React.FC;
  Panel: typeof PopoverPanel;
} & React.FC<PopoverProps>;

type PopoverState = {
  open: boolean;
  toggle: () => void;
  setClose: () => void;
  referenceElement: Element | VirtualElement | null | undefined;
  setReferenceElement: React.Dispatch<React.SetStateAction<any>>;
};

const PopoverContext = createContext<PopoverState | null>(null);

type PopoverProps = { children: React.ReactNode };
const Popover = ({ children }: PopoverProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [referenceElement, setReferenceElement] = useState();

  const toggle = useCallback(() => setOpen((open) => !open), [setOpen]);
  const setClose = useCallback(() => setOpen(false), [setOpen]);

  const value = useMemo<PopoverState>(
    () => ({ open, toggle, setClose, referenceElement, setReferenceElement }),
    [setClose, toggle, open, referenceElement]
  );

  return (
    <PopoverContext.Provider value={value}>
      <HLPopover>{children}</HLPopover>
    </PopoverContext.Provider>
  );
};

const usePopoverContext = (): PopoverState => {
  const context = useContext<PopoverState | null>(PopoverContext);

  if (!context) {
    throw new Error(`Toggle compound components cannot be rendered outside the Popover component`);
  }

  return context;
};

type PopoverPanelProps = {
  config?: Partial<PopperJS.Options>;
  children: React.ReactNode;
  className?: string;
};
const PopoverPanel = ({ config = {}, children, className }: PopoverPanelProps) => {
  const { open, toggle, referenceElement } = usePopoverContext();

  const [popperElement, setPopperElement] = useState<any>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, config);

  if (!open) return null;
  return (
    <>
      <div
        className="fixed inset-0 z-10 h-screen w-screen bg-black bg-opacity-10"
        onClick={toggle}
      />
      <HLPopover.Panel
        static
        ref={setPopperElement}
        style={{ ...styles.popper }}
        className={clsx(className, 'z-20 rounded bg-white p-4 shadow')}
        {...attributes.popper}
      >
        {children}
      </HLPopover.Panel>
    </>
  );
};

export interface PopoverOptionsProps {
  name: string;
  description?: string;
  isActive?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void | SyntheticEvent | React.ChangeEvent<HTMLDivElement>;
  type?: 'error' | 'default';
  style?: 'primary' | 'secondary' | 'error' | 'default';
  size?: 'small' | 'default' | 'large';
  disabled?: boolean;
}

const PopoverOption = ({
  name,
  icon,
  type,
  description,
  style = 'default',
  size = 'default',
  onClick,
  disabled,
  isActive,
}: PopoverOptionsProps) => {
  const { setClose } = usePopoverContext();
  const handleClick = () => {
    if (disabled) return;
    onClick?.();
    setClose();
  };
  return (
    <div
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleClick();
        }
      }}
      role="button"
      tabIndex={0}
      key={name}
      className={clsx(
        'flex items-center border-neutral-6  px-2 py-1 pt-3 pb-3 font-alt  transition duration-150 ease-in-out',
        size === 'default' && '',
        !disabled && 'hover:bg-blue-100',
        ' cursor-pointer select-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50'
      )}
    >
      {icon && icon}
      <div>
        <p
          className={clsx(
            'px-2 text-sm font-normal ',
            isActive && 'text-neutral-3',
            !disabled && [style === 'default' && 'text-neutral-4'],
            disabled && 'text-black-500'
          )}
        >
          {name}
        </p>
        <p className="px-2 text-[10px] text-neutral-4">{description}</p>
      </div>
    </div>
  );
};

export interface PopoverWalletProps {
  name: string;
  account?: string;
  amount: string;
  isActive?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void | SyntheticEvent | React.ChangeEvent<HTMLDivElement>;
  type?: 'error' | 'default';
  style?: 'primary' | 'secondary' | 'error' | 'default';
  size?: 'small' | 'default' | 'large';
  disabled?: boolean;
}

const PopoverWallet = ({
  name,
  icon,
  account,
  amount,
  style = 'default',
  size = 'default',
  onClick,
  disabled,
  isActive,
}: PopoverWalletProps) => {
  const { setClose } = usePopoverContext();
  const handleClick = () => {
    if (disabled) return;
    if (onClick) onClick();
    setClose();
  };
  return (
    <div
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleClick();
        }
      }}
      role="button"
      tabIndex={0}
      key={name}
      className={clsx(
        'flex	min-w-fit items-center justify-between border-neutral-6 py-1 pt-3 pb-3 font-alt  transition duration-150 ease-in-out',
        size === 'default' && '',
        !disabled && 'hover:bg-blue-100',
        ' cursor-pointer select-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50'
      )}
    >
      <div className="flex flex-row pl-2">
        {icon && icon}
        <div className="flex flex-col px-4">
          <div className="flex items-baseline py-1.5">
            <p
              className={clsx(
                'text-md font-normal text-neutral-3 ',
                isActive && 'text-black',
                !disabled && [style === 'default' && 'text-neutral-4'],
                disabled && 'text-black-500'
              )}
            >
              {name}
            </p>
            <p className={clsx('pl-1 text-sm font-normal text-neutral-5 ')}>({account})</p>
          </div>
          <p className={clsx('text-md font-normal text-primary')}>{amount}</p>
        </div>
      </div>
      <button>
        <IconDots />
      </button>
    </div>
  );
};

const PopoverButton = ({ children }: any) => {
  const { toggle, setReferenceElement } = usePopoverContext();
  return React.cloneElement(children, {
    ref: setReferenceElement,
    onClick: toggle,
  });
};

Popover.Button = PopoverButton;
Popover.Option = PopoverOption;
Popover.Wallet = PopoverWallet;
Popover.Panel = PopoverPanel;

export default Popover as unknown as ICompoundComponent;
