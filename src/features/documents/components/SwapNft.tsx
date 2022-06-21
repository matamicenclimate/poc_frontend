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

  return (
    <div>
      <Button onClick={() => setIsOpen(true)} disabled={swapNft.isLoading}>
        {t('documents.Details.button.swap')}
      </Button>
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
        title={'🚨 Are you sure?'}
        claim={'Are you sure you want to swap this product? This action is not reversible.'}
      >
        <Dl wrapperClassName={'mb-8'}>
          <DlItem dt={'Total Climatecoins'} dd={document.credits} />
          <DlItem dt={'In Euros'} dd={formatter(climatecoinValue(Number(document.credits)))} />
          <hr className="col-span-2" />
          <DlItem
            dt={'Swap in wallet...'}
            dd={`${account?.slice(0, 10)}...${account?.slice(-10)}`}
          />
        </Dl>
      </Dialog>
    </div>
  );
}
