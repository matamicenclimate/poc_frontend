import { Dialog as HUIDialog } from '@headlessui/react';
import { Button } from '../Elements/Button/Button';
import { useTranslation } from 'react-i18next';

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
};

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
      <div className="relative mx-auto w-full max-w-screen-sm rounded bg-white p-4">
        <HUIDialog.Title className="text-xl">{title}</HUIDialog.Title>
        {subtitle ? <HUIDialog.Description>{subtitle}</HUIDialog.Description> : null}

        {claim ? <p>{claim} </p> : null}
        <div className="flex justify-end space-x-2">
          <Button onClick={() => (onCancel ? onCancel() : setIsOpen(false))} size="md">
            {cancelLabel ? cancelLabel : t('dialogs.base.cancel')}
          </Button>
          <Button onClick={() => (onAccept ? onAccept() : setIsOpen(false))} size="md">
            {acceptLabel ? acceptLabel : t('dialogs.base.accept')}
          </Button>
        </div>
      </div>
    </HUIDialog>
  );
};
