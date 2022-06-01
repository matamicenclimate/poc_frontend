import { Dialog as HUIDialog } from '@headlessui/react';
import { Button } from '../Elements/Button/Button';
import { useTranslation } from 'react-i18next';
import { Spinner } from '@/componentes/Elements/Spinner/Spinner';
import clsx from 'clsx';

type DialogProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  subtitle?: string;
  claim?: string;
  onAccept?: () => void;
  acceptLabel?: string;
  onCancel?: () => void;
  cancelLabel?: string;
  isLoading?: boolean;
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
      <div className={clsx('relative mx-auto w-full  rounded bg-white p-4', sizes[size])}>
        <HUIDialog.Title className="text-xl">{title}</HUIDialog.Title>
        {subtitle ? <HUIDialog.Description>{subtitle}</HUIDialog.Description> : null}

        {claim ? <p>{claim} </p> : null}
        <div className="flex items-center justify-end space-x-2">
          {isLoading ? <Spinner /> : null}
          <Button
            onClick={() => (onCancel ? onCancel() : setIsOpen(false))}
            size="md"
            variant="dark"
            disabled={isLoading}
          >
            {cancelLabel ? cancelLabel : t('dialogs.base.cancel')}
          </Button>
          <Button
            onClick={() => (onAccept ? onAccept() : setIsOpen(false))}
            size="md"
            disabled={isLoading}
          >
            {acceptLabel ? acceptLabel : t('dialogs.base.accept')}
          </Button>
        </div>
      </div>
    </HUIDialog>
  );
};
