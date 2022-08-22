import { Dialog as HUIDialog } from '@headlessui/react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import { Spinner } from '@/componentes/Elements/Spinner/Spinner';

import { Button } from '../Elements/Button/Button';
import { Icon } from '../Icon/Icon';

type DialogProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string | JSX.Element;
  subtitle?: string | JSX.Element;
  claim?: string | JSX.Element;
  onAccept?: () => void;
  acceptLabel?: string;
  onCancel?: () => void;
  cancelLabel?: string;
  isLoading?: boolean;
  isValid?: boolean;
  children?: JSX.Element;
  iconClose?: boolean;
  size?: keyof typeof sizes;
};

const sizes = { default: 'max-w-screen-sm', xs: 'max-w-md' };
export const Dialog = ({
  isOpen,
  setIsOpen,
  title,
  subtitle,
  claim,
  onAccept,
  acceptLabel,
  onCancel,
  cancelLabel,
  isLoading,
  isValid = true,
  iconClose = true,
  children,
  size = 'default',
}: DialogProps) => {
  const { t } = useTranslation();
  return (
    <HUIDialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="fixed inset-0 z-10 flex h-screen items-center overflow-y-auto"
    >
      {/* Use the overlay to style a dim backdrop for your dialog */}
      <HUIDialog.Overlay className="fixed inset-0 bg-black opacity-30" />
      <div className={clsx('relative mx-auto w-full rounded-2xl bg-white p-8', sizes[size])}>
        <HUIDialog.Title className="flex justify-between text-3xl">
          {title}{' '}
          {iconClose && (
            <button className="p-1" onClick={() => setIsOpen(!isOpen)}>
              <Icon
                id="x-close-neutral-4"
                className="h-10 w-10 rounded-full border-2 border-neutral-6"
              />
            </button>
          )}
        </HUIDialog.Title>
        {subtitle ? <HUIDialog.Description>{subtitle}</HUIDialog.Description> : null}
        {claim ? (
          <p className="flex py-8 px-4 text-center text-md leading-normal">{claim} </p>
        ) : null}
        {children}
        <div className="grid grid-cols-5 gap-2">
          <Button
            className="col-span-2"
            onClick={() => (onCancel ? onCancel() : setIsOpen(false))}
            size="md"
            variant="dark"
            disabled={isLoading}
          >
            {cancelLabel ? cancelLabel : t('dialogs.base.cancel')}
          </Button>
          <div className="flex items-center justify-center">{isLoading ? <Spinner /> : null}</div>
          <Button
            className="col-span-2"
            onClick={() => (onAccept ? onAccept() : setIsOpen(false))}
            size="md"
            disabled={isLoading || !isValid}
            type="button"
          >
            {acceptLabel ? acceptLabel : t('dialogs.base.accept')}
          </Button>
        </div>
      </div>
    </HUIDialog>
  );
};
