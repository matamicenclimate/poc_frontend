import { Breadcrumb } from '@/componentes/Elements/Breadcrumb/Breadcrumb';
import { Button } from '@/componentes/Elements/Button/Button';
import { Link } from '@/componentes/Elements/Link/Link';
import { MainLayout } from '@/componentes/Layout/MainLayout';
import { useTranslation } from 'react-i18next';

import { Form } from '@/componentes/Form/Form';
import { Input } from '@/componentes/Form/Inputs';
import { Title } from '@/componentes/Elements/Title/Title';
import { useWalletContext } from '@/providers/Wallet.context';
import { Card } from '@/componentes/Card/Card';
import { useOptinToAsset } from '../api/useOptinToAsset';

export const Wallet = () => {
  const { t } = useTranslation();

  const { account, hasOptedIn } = useWalletContext();
  const optinToAsset = useOptinToAsset();

  const handleSubmit = async (data: any) => {
    console.log(data);
    await optinToAsset.mutateAsync(Number(data.asaId));
  };

  return (
    <MainLayout title={t('head.Wallet.title')}>
      <Breadcrumb links={[{ to: '/wallet', label: t('head.Wallet.title') }]} />

      <Title size={1}>{t('wallet.Wallet.title')}</Title>
      {!hasOptedIn(Number(process.env.REACT_APP_CLIMATECOIN_ASA_ID as string)) && (
        <Card padding="sm">
          <div className="flex items-center justify-between">
            <div>You have to opt-in to receive Climatecoins in order to continue</div>
            <Button
              onClick={() =>
                optinToAsset.mutateAsync(Number(process.env.REACT_APP_CLIMATECOIN_ASA_ID as string))
              }
              size="xs"
            >
              opt in to climatecoin
            </Button>
          </div>
        </Card>
      )}
      {!hasOptedIn(Number(process.env.REACT_APP_USDC_ASA_ID as string)) && (
        <Card padding="sm">
          <div className="flex items-center justify-between">
            <div>You have to opt-in to receive usdc in order to continue</div>
            <Button
              onClick={() =>
                optinToAsset.mutateAsync(Number(process.env.REACT_APP_USDC_ASA_ID as string))
              }
              size="xs"
            >
              opt in to usdc
            </Button>
          </div>
        </Card>
      )}

      <Form onSubmit={handleSubmit} className="my-4 space-y-4 rounded border p-4">
        <Title size={3}>Optin to asset</Title>
        <Input name="asaId" type="text" label="asset id" />
        <Button type="submit">Optin</Button>
      </Form>
      {process.env.NODE_ENV === 'development' ? (
        <>
          <Link href="https://bank.testnet.algorand.network/">get algo faucet </Link>
          <br />
          <Link href="https://dispenser.testnet.aws.algodev.network/">get usdc faucet </Link>
        </>
      ) : null}
      <br />
      {account?.address}
      <br />
      <pre>{JSON.stringify(account, null, 2)}</pre>
      <br />
    </MainLayout>
  );
};
