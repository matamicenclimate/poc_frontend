import algosdk from 'algosdk';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Dl, DlItem } from '@/componentes/DescriptionList';
import { Dialog } from '@/componentes/Dialog/Dialog';
import { Button } from '@/componentes/Elements/Button/Button';
import { Input } from '@/componentes/Form/Inputs';
import { formatter } from '@/providers/Wallet.context';

import { useTransferAsset } from '../api/useTransferAsset';
import { Asset, AssetTransfer, ButtonProps, DialogDataProps } from '../types';

type AssetActionProps = {
  asset: Asset;
  address: string;
  disabled: boolean;
  type: 'send' | 'remove';
  className?: string;
};

export function AssetAction({ asset, address, disabled, className, type }: AssetActionProps) {
  const { t } = useTranslation();
  const initialAssetTransfer = { amount: 0, receiver: '', asset: asset };
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState<object>({});
  const [assetTransfer, setAssetTransfer] = useState<AssetTransfer>(initialAssetTransfer);
  const [validAssetTransfer, setValidassetTransfer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sendAsset = useTransferAsset();

  const handleSubmit = () => {
    if (!isValid(assetTransfer)) return;
    setIsLoading(true);
    sendAsset.mutateAsync(assetTransfer).then(() => {
      close();
      setIsLoading(false);
    });
  };

  const isValid = (assetTransfer: AssetTransfer): boolean => {
    const detectedErrors: { receiver?: string; amount?: string } = {};
    if (assetTransfer.receiver && !algosdk.isValidAddress(assetTransfer.receiver))
      detectedErrors['receiver'] = t('Asset.actions.adress.error');
    if (assetTransfer.amount >= asset.amount)
      detectedErrors['amount'] = t('Asset.actions.amount.error');
    if (assetTransfer.amount < 0) detectedErrors['amount'] = t('Asset.actions.amount.invalid');

    setErrors(detectedErrors);
    const valid =
      assetTransfer.amount !== initialAssetTransfer.amount &&
      assetTransfer.receiver !== initialAssetTransfer.receiver &&
      Object.keys(detectedErrors).length === 0;
    setValidassetTransfer(valid);
    return valid;
  };

  const handleInput = (assetTransfer: AssetTransfer) => {
    setAssetTransfer(assetTransfer);
    isValid(assetTransfer);
  };

  const close = () => {
    setIsOpen(false);
    setAssetTransfer(initialAssetTransfer);
    setValidassetTransfer(false);
  };

  const send: DialogDataProps = {
    acceptLabel: t('Wallet.action.dialog.send.acceptLabel'),
    title: t('Wallet.action.dialog.send.title'),
    claim: t('Wallet.action.dialog.send.claim'),
    accentColor: 'text-primary-brightGreen',
    button: {
      variant: 'grey',
      onClick: () => setIsOpen(true),
      label: t('Wallet.action.dialog.send.title'),
    },
  };

  const remove: DialogDataProps = {
    acceptLabel: t('Wallet.action.dialog.delete.acceptLabel'),
    title: t('Wallet.action.dialog.delete.title'),
    claim: t('Wallet.action.dialog.delete.claim'),
    accentColor: 'text-primary-red',
    button: {
      variant: 'danger',
      onClick: () => setIsOpen(true),
      label: t('Wallet.action.dialog.delete.title'),
    },
  };

  const DialogData = { send, remove };

  const renderSendTo = () => {
    if (type === 'send') {
      return (
        <>
          <hr className="col-span-2" />
          <DlItem
            fullWidth
            dt={t('Wallet.action.dialog.to')}
            dd={
              <textarea
                id="name"
                name="name"
                maxLength={70}
                className="w-full border-2"
                onBlur={(e: any) =>
                  handleInput({
                    ...assetTransfer,
                    receiver: e.target.value,
                  })
                }
              />
            }
          />
        </>
      );
    }
    return '';
  };

  const renderButton = ({ variant, onClick, label }: ButtonProps) => {
    return (
      <Button
        type="button"
        className="bg-neutral-7"
        variant={variant}
        size="sm"
        onClick={onClick}
        disabled={disabled}
      >
        {label}
      </Button>
    );
  };

  return (
    <>
      <div className={className}>{renderButton(DialogData[type].button)}</div>
      <Dialog
        size="xs"
        isOpen={isOpen}
        setIsOpen={close}
        acceptLabel={DialogData[type].acceptLabel}
        cancelLabel={t('Wallet.action.dialog.cancel')}
        onCancel={() => setIsOpen(!isOpen)}
        title={DialogData[type].title}
        claim={DialogData[type].claim}
        isValid={validAssetTransfer}
        isLoading={isLoading}
        onAccept={handleSubmit}
      >
        <Dl wrapperClassName={'mb-8'}>
          <DlItem
            dt={t('Wallet.action.dialog.from')}
            dd={`${address?.slice(0, 30)}...${address?.slice(-3)}`}
          />

          <hr className="col-span-2" />
          <DlItem dt={t('Asset.actions.table.id')} dd={asset['asset-id'].toString()} />

          <DlItem dt={t('Asset.actions.table.name')} dd={asset.name} />

          <DlItem
            dt={t('Asset.actions.table.balance')}
            dd={formatter(asset.amount, asset.decimals) + ' ' + asset['unit-name']}
            ddClassNames={DialogData[type].accentColor}
          />

          <DlItem
            dt={t('Wallet.action.dialog.amount')}
            dd={
              <Input
                type="number"
                step="any"
                name="amount"
                placeholder="0"
                required
                inputClassName="w-full border-2"
                errors={errors}
                onBlur={(e: any) =>
                  handleInput({
                    ...assetTransfer,
                    amount: Number(e.target.value) * 10 ** asset.decimals,
                  })
                }
              />
            }
            ddClassNames="text-primary-brightGreen"
          />

          {renderSendTo()}
        </Dl>
      </Dialog>
    </>
  );
}
