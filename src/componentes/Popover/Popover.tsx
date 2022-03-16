import React, {
  SyntheticEvent,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { Popover as HLPopover } from '@headlessui/react';
import { usePopper } from 'react-popper';
import { VirtualElement } from '@popperjs/core';
import * as PopperJS from '@popperjs/core';
import clsx from 'clsx';

export interface PopoverOptionsProps {
  name: string;
  icon?: string;
  onClick?: () => void | SyntheticEvent | React.ChangeEvent<HTMLDivElement>;
  type?: 'error' | 'default';
  style?: 'primary' | 'secondary' | 'error' | 'default';
  size?: 'small' | 'default' | 'large';
  disabled?: boolean;
}

type ICompoundComponent = {
  Option: React.FC<PopoverOptionsProps>;
  Button: React.FC;
  Panel: React.FC<PopoverPanelProps>;
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
        className={clsx('z-20', 'rounded bg-white p-4 shadow', className)}
        {...attributes.popper}
      >
        {children}
      </HLPopover.Panel>
    </>
  );
};

const PopoverOption = ({
  name,
  icon,
  type,
  style = 'default',
  size = 'default',
  onClick,
  disabled,
}: PopoverOptionsProps) => {
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
        'flex items-center px-2 py-1 transition duration-150 ease-in-out',
        size === 'default' && '',
        !disabled && 'hover:bg-blue-100',
        ' cursor-pointer select-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50'
      )}
    >
      <p
        className={clsx(
          'text-base px-2 font-normal ',
          !disabled && [
            style === 'default' && 'text-secondary',
            style === 'primary' && 'text-primary',
            style === 'secondary' && 'text-secondary',
            style === 'error' && 'text-red-500',
            type === 'error' && 'text-red-500',
          ],
          disabled && 'text-black-500'
        )}
      >
        {name}
      </p>
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
Popover.Panel = PopoverPanel;

export default Popover as unknown as ICompoundComponent;
