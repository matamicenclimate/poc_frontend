import { Dialog as HUIDialog } from '@headlessui/react';
import { Button } from '../Elements/Button/Button';
import { useTranslation } from 'react-i18next';
import { Spinner } from '@/componentes/Elements/Spinner/Spinner';

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
  isLoading,
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
        <div className="flex items-center justify-end space-x-2">
          {isLoading ? <Spinner /> : null}
          <Button
            onClick={() => (onCancel ? onCancel() : setIsOpen(false))}
            size="md"
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
