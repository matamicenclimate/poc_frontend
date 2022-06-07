import { Popover as HLPopover } from '@headlessui/react';
import * as PopperJS from '@popperjs/core';
import { VirtualElement } from '@popperjs/core';
import clsx from 'clsx';
import React, {
  createContext,
  SyntheticEvent,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { usePopper } from 'react-popper';

import { ReactComponent as IconDots } from '@/assets/icons/bx-dots-vertical.svg';
import styles from '@/componentes/Layout/Navbar/sections/shared.module.css';

type ICompoundComponent = {
  Option: React.FC<React.PropsWithChildren<PopoverOptionsProps>>;
  Wallet: React.FC<React.PropsWithChildren<PopoverWalletProps>>;
  Button: React.FC<React.PropsWithChildren<PopoverButtonOptions>>;
  Panel: typeof PopoverPanel;
} & React.FC<React.PropsWithChildren<PopoverProps>>;

type PopoverState = {
  open: boolean;
  toggle: () => void;
  setClose: () => void;
  referenceElement: Element | VirtualElement | null | undefined;
  setReferenceElement: React.Dispatch<React.SetStateAction<any>>;
};

const PopoverContext = createContext<PopoverState | null>(null);

type PopoverProps = { children: React.ReactNode; onClose?: () => void };
const Popover = ({ children, onClose }: PopoverProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [referenceElement, setReferenceElement] = useState();

  const toggle = useCallback(() => setOpen((open) => !open), [setOpen]);
  const setClose = useCallback(() => {
    setOpen(false);
    onClose?.();
  }, [setOpen]);

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
  const { open, setClose, referenceElement } = usePopoverContext();

  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    ...config,
    modifiers: [
      { name: 'arrow', options: { element: arrowElement } },
      {
        name: 'preventOverflow',
        options: {
          altAxis: true,
          padding: 32,
        },
      },
      ...(config.modifiers ? config.modifiers : []),
    ],
  });

  if (!open) return null;
  return (
    <>
      <div
        className="fixed inset-0 z-10 h-screen w-screen bg-black bg-opacity-10"
        onClick={setClose}
      />

      <HLPopover.Panel
        static
        ref={setPopperElement}
        style={styles.popper}
        className={clsx(className, 'z-20 mt-2 rounded bg-white p-4 shadow')}
        {...attributes.popper}
      >
        <div ref={setArrowElement} style={styles.arrow} className="-top-2 z-30 ">
          <div className="h-4 w-4 rotate-45 bg-white" />
        </div>

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
      className={clsx(size === 'default' && '', styles.popover__option)}
    >
      {icon && icon}
      <div>
        <p
          className={clsx(
            'px-2 text-sm font-normal ',
            isActive && 'text-neutral-3 underline',
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
        size === 'default' && '',
        !disabled && 'hover:bg-neutral-7',
        styles.popover__option
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

interface PopoverButtonOptions {
  children?: React.ReactElement;
  render?: (isOpen: boolean) => React.ReactElement;
}

const PopoverButton = ({ children, render }: PopoverButtonOptions) => {
  const { toggle, setReferenceElement, open } = usePopoverContext();

  if (!render && !children) throw new Error('Render or Children prop must be passed');

  return React.cloneElement(render ? render(open) : (children as React.ReactElement), {
    ref: setReferenceElement,
    onClick: toggle,
  });
};

Popover.Button = PopoverButton;
Popover.Option = PopoverOption;
Popover.Wallet = PopoverWallet;
Popover.Panel = PopoverPanel;

export default Popover as unknown as ICompoundComponent;
