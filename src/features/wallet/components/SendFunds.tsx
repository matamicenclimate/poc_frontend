import clsx from 'clsx';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Dl, DlItem } from '@/componentes/DescriptionList';
import { Dialog } from '@/componentes/Dialog/Dialog';
import { Button } from '@/componentes/Elements/Button/Button';
import { Link } from '@/componentes/Elements/Link/Link';
import { EXPLORER_URL } from '@/config';

type SendFundsProps = {
  account: any;
  className?: string;
};

export function SendFunds({ account, className }: SendFundsProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className={clsx(className, 'flex flex-row space-x-3')}>
        <Link
          href={`${EXPLORER_URL}address/${encodeURIComponent(account?.address as string)}`}
          className="inline-flex items-center font-bold no-underline"
        >
          <Button type="button" className="bg-neutral-7" variant="grey" size="sm">
            {t('Wallet.button.view')}
          </Button>
        </Link>
        <Button
          type="button"
          className="bg-neutral-7"
          variant="grey"
          size="sm"
          onClick={() => setIsOpen(true)}
        >
          Add funds
        </Button>
        <Button
          type="button"
          className="bg-neutral-7"
          variant="grey"
          size="sm"
          onClick={() => setIsOpen(true)}
        >
          Send funds
        </Button>
      </div>
      <Dialog
        size="xs"
        isOpen={isOpen}
        setIsOpen={() => setIsOpen(false)}
        acceptLabel="Send"
        cancelLabel="Cancel"
        onCancel={() => setIsOpen(!isOpen)}
        title="Send funds"
        claim="Send your funds to another wallet, enter the wallet address. Warning. If you enter the wrong address you will lose your funds."
      >
        <Dl wrapperClassName={'mb-8'}>
          <DlItem
            dt={'Your Climatecoins'}
            dd={<span> {t('intlNumber', { val: account.amount.toFixed(2) })} CC</span>}
          />
          <DlItem
            dt={'Send...'}
            dd={<input type="text" id="name" name="name" className="w-full border-2" required />}
            ddClassNames="text-primary-brightGreen"
          />
          <hr className="col-span-2" />

          <DlItem
            fullWidth
            dt={'Send to'}
            dd={<textarea id="name" name="name" maxLength={70} className="w-full border-2" />}
          />
        </Dl>
      </Dialog>
    </>
  );
}
