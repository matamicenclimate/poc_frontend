import algosdk from 'algosdk';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Dl, DlItem } from '@/componentes/DescriptionList';
import { Dialog } from '@/componentes/Dialog/Dialog';
import { Button } from '@/componentes/Elements/Button/Button';
import { Input, Textarea } from '@/componentes/Form/Inputs';
import { useWalletContext } from '@/providers/Wallet.context';

import { usePayment } from '../api/usePayment';
import { Account, ButtonProps, DialogDataProps, Payment } from '../types';

type SendFundsProps = {
  account: Account;
  className?: string;
  type: 'add' | 'send';
};

export function SendFunds({ account, className, type }: SendFundsProps) {
  const { t } = useTranslation();
  const initialPayment = { amount: 0, receiver: '' };
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState<object>({});
  const [payment, setPayment] = useState<Payment>(initialPayment);
  const [validPayment, setValidPayment] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { algoBalance } = useWalletContext();

  const sendAlgos = usePayment();

  const handleSubmit = () => {
    if (!isValid(payment)) return;
    setIsLoading(true);
    sendAlgos.mutateAsync(payment).then(() => {
      close();
      setIsLoading(false);
    });
  };

  const isValid = (payment: Payment): boolean => {
    const detectedErrors: { receiver?: string; amount?: string } = {};
    if (payment.receiver && !algosdk.isValidAddress(payment.receiver))
      detectedErrors['receiver'] = 'Invalid address';
    if (payment.amount >= account.amount) detectedErrors['amount'] = 'Not enough Algos';
    if (payment.amount < 0) detectedErrors['amount'] = 'Invalid amount';
    setErrors(detectedErrors);
    const valid =
      payment.amount !== initialPayment.amount &&
      payment.receiver !== initialPayment.receiver &&
      Object.keys(detectedErrors).length === 0;
    setValidPayment(valid);
    return valid;
  };

  const handleInput = (payment: Payment) => {
    setPayment(payment);
    isValid(payment);
  };

  const close = () => {
    setIsOpen(false);
    setPayment(initialPayment);
    setValidPayment(false);
  };

  const send: DialogDataProps = {
    acceptLabel: t('Wallet.funds.dialog.send.acceptLabel'),
    title: t('Wallet.funds.dialog.send.title'),
    claim: t('Wallet.funds.dialog.send.claim'),
    accentColor: 'text-primary-brightGreen',
    // onSubmit: SendFunds,
    button: {
      variant: 'grey',
      onClick: () => setIsOpen(true),
      label: t('Wallet.funds.dialog.send.title'),
    },
  };

  const add: DialogDataProps = {
    acceptLabel: t('Wallet.funds.dialog.add.acceptLabel'),
    title: t('Wallet.funds.dialog.add.title'),
    claim: t('Wallet.funds.dialog.add.claim'),
    accentColor: 'text-primary-brightGreen',
    // onSubmit: AddFunds(),
    button: {
      variant: 'grey',
      onClick: () => setIsOpen(true),
      label: t('Wallet.funds.dialog.add.title'),
      disabled: true,
    },
  };

  const DialogData = { add, send };

  const renderButton = ({ variant, onClick, label, disabled }: ButtonProps) => {
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
      {renderButton(DialogData[type].button)}
      <Dialog
        size="xs"
        isOpen={isOpen}
        setIsOpen={close}
        acceptLabel={DialogData[type].acceptLabel}
        cancelLabel={t('Wallet.action.dialog.cancel')}
        onCancel={close}
        onAccept={handleSubmit}
        title={DialogData[type].title}
        claim={DialogData[type].claim}
        isValid={validPayment}
        isLoading={isLoading}
      >
        <Dl wrapperClassName={'mb-8'}>
          <DlItem
            dt={'Your Algos'}
            dd={<span>{algoBalance()}</span>}
            ddClassNames="text-primary-brightGreen"
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
                    ...payment,
                    amount: algosdk.algosToMicroalgos(Number(e.target.value)),
                  })
                }
              />
            }
            ddClassNames="text-primary-brightGreen"
          />
          <hr className="col-span-2" />

          <DlItem
            fullWidth={true}
            dt={type === 'send' ? t('Wallet.action.dialog.to') : t('Wallet.action.dialog.from')}
            dd={
              <Textarea
                type="text"
                name="receiver"
                required
                max={70}
                errors={errors}
                onBlur={(e: any) =>
                  handleInput({
                    ...payment,
                    receiver: e.target.value,
                  })
                }
              />
            }
          />
        </Dl>
      </Dialog>
    </>
  );
}
