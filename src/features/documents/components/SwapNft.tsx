import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Dl, DlItem } from '@/componentes/DescriptionList';
import { Dialog } from '@/componentes/Dialog/Dialog';
import { Button } from '@/componentes/Elements/Button/Button';
import { useCurrencyContext } from '@/providers/Currency.context';

import { useSwapNftForClimatecoins } from '../api/useSwapNftForClimatecoins';
import { CarbonDocument } from '../types';

type SwapNftProps = {
  document: CarbonDocument;
  account: string;
};

export function SwapNft({ document, account }: SwapNftProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const swapNft = useSwapNftForClimatecoins();
  const { formatter, climatecoinValue } = useCurrencyContext();
  const currency = useCurrencyContext();

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        <Button
          onClick={() => setIsOpen(true)}
          disabled={swapNft.isLoading}
          className="col-span-1 col-start-3"
        >
          {t('documents.Details.button.swap')}
        </Button>
      </div>

      <Dialog
        size="xs"
        isOpen={isOpen}
        setIsOpen={() => setIsOpen(false)}
        onAccept={() =>
          swapNft.mutateAsync({
            documentId: document.id,
          })
        }
        acceptLabel="Yes, swap"
        cancelLabel="Back"
        onCancel={() => setIsOpen(!isOpen)}
        isLoading={swapNft.isLoading}
        title={t('documents.Details.modal.title')}
        claim={t('documents.Details.modal.claim')}
      >
        <Dl wrapperClassName={'mb-8'}>
          <DlItem
            dt={t('documents.Details.modal.totalClimatecoins')}
            dd={document.credits + ' cc'}
            ddClassNames={'text-primary-brightGreen'}
          />
          <DlItem
            dt={t('documents.Details.modal.totalCurrency', {
              currency: currency.state.currency,
            })}
            dd={formatter(climatecoinValue(Number(document.credits)))}
          />
          <hr className="col-span-2" />
          <DlItem
            dt={t('documents.Details.modal.wallet')}
            dd={`${account?.slice(0, 30)}...${account?.slice(-3)}`}
          />
        </Dl>
      </Dialog>
    </>
  );
}
