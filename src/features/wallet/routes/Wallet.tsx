import { useTranslation } from 'react-i18next';

import { Card } from '@/componentes/Card/Card';
import { Button } from '@/componentes/Elements/Button/Button';
import { Link } from '@/componentes/Elements/Link/Link';
import { Title } from '@/componentes/Elements/Title/Title';
import { Aside } from '@/componentes/Layout/Aside/Aside';
import { OperationsMenu } from '@/componentes/Layout/Aside/components/OperationsMenu';
import { PersonalMenu } from '@/componentes/Layout/Aside/components/PersonalMenu';
import { MainLayout } from '@/componentes/Layout/MainLayout';
import { EXPLORER_URL } from '@/config';
import { useAuth } from '@/lib/auth';
import { useWalletContext } from '@/providers/Wallet.context';

export const Wallet = () => {
  const { t } = useTranslation();
  const { account } = useWalletContext();
  const { user } = useAuth();

  const getProfileAvatar = () => {
    if (user?.avatar?.url) {
      return user?.avatar.url;
    }
    return 'avatar-placeholder.jpg';
  };

  return (
    <MainLayout title={t('head.Wallet.title')}>
      <div className="mt-16 grid  gap-8 md:grid-cols-4">
        <aside className="text-sm text-neutral-4">
          <img src={getProfileAvatar()} className="h-32 rounded-full" />
          <div className="mb-4 mt-8 flex flex-col capitalize ">
            <div className="text-2xl  text-black">
              {t('documents.Upload.hi')}
              {user?.username?.split('@')[0]} 👋🏻
            </div>
            <div className="mt-2 text-lg text-neutral-5">
              {user?.type}
              {user?.country?.name && `, ${user.country.name}`}
            </div>
          </div>
          <hr />
          <Aside menu={OperationsMenu()} />
          <hr />
          <Aside menu={PersonalMenu()} />
        </aside>
        <main className="space-y-4 md:col-span-3">
          <div>
            <Card>
              <Title size={5} as={2} className="mb-12">
                {t('Wallet.title')}
              </Title>
              {account?.address && (
                <Card padding={'sm'}>
                  <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-col space-y-1 text-sm text-neutral-4">
                      <span> {t('Wallet.span')} 1 (10,50 cc)</span>
                      <div className="inline-flex items-center font-bold text-black">
                        {account?.address.slice(0, 10)}...{account.address?.slice(-10)}
                        <img src="/icons/algoexplorer.png" className="ml-2 h-4 w-4 rounded-full" />
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <Link
                        href={`${EXPLORER_URL}address/${encodeURIComponent(
                          account?.address as string
                        )}`}
                        className="inline-flex items-center font-bold no-underline"
                      >
                        <Button
                          type="button"
                          className="bg-neutral-7 py-1"
                          variant="grey"
                          size="md"
                        >
                          {t('Wallet.button.view')}
                        </Button>
                      </Link>
                      <Button type="button" variant="danger" className="py-1" size="md" disabled>
                        {t('Wallet.button.delete')}
                      </Button>
                    </div>
                  </div>
                </Card>
              )}
              {/* TO DO: at this time it is not possible to have multiple wallets. You can only have the wallet provided by Magic Link*/}
              <div className="mt-8 flex w-full justify-center">
                <Button type="button" variant="primary" className="py-1" size="md" disabled>
                  + {t('Wallet.button.new')}
                </Button>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </MainLayout>
    //   {!hasOptedIn(Number(process.env.REACT_APP_CLIMATECOIN_ASA_ID as string)) && (
    //     <Card padding="sm">
    //       <div className="flex items-center justify-between">
    //         <div>You have to opt-in to receive Climatecoins in order to continue</div>
    //         <Button
    //           onClick={() =>
    //             optinToAsset.mutate(Number(process.env.REACT_APP_CLIMATECOIN_ASA_ID as string))
    //           }
    //           size="xs"
    //         >
    //           opt in to climatecoin
    //         </Button>
    //       </div>
    //     </Card>
    //   )}
  );
};
