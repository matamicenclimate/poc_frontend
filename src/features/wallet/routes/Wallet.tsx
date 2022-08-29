import clsx from 'clsx';
import { useState } from 'react';
import { useAlert } from 'react-alert';
import { useTranslation } from 'react-i18next';

import { Card } from '@/componentes/Card/Card';
import { Button } from '@/componentes/Elements/Button/Button';
import { Link } from '@/componentes/Elements/Link/Link';
import { Spinner } from '@/componentes/Elements/Spinner/Spinner';
import { Title } from '@/componentes/Elements/Title/Title';
import { Aside } from '@/componentes/Layout/Aside/Aside';
import { OperationsMenu } from '@/componentes/Layout/Aside/components/OperationsMenu';
import { PersonalMenu } from '@/componentes/Layout/Aside/components/PersonalMenu';
import { MainLayout } from '@/componentes/Layout/MainLayout';
import { EXPLORER_URL } from '@/config';
import { useAuth } from '@/lib/auth';
import { useCurrencyContext } from '@/providers/Currency.context';
import { assetFormatter, useWalletContext } from '@/providers/Wallet.context';

import { useGetAssets } from '../api/useGetAssets';
import { AssetAction } from '../components/AssetAction';
import { SendFunds } from '../components/SendFunds';
import { Account } from '../types';

export const Wallet = () => {
  const { t } = useTranslation();
  const { account, climatecoinBalance, algoBalance } = useWalletContext();
  const { user } = useAuth();
  const alert = useAlert();
  const { formatter, climatecoinValue, formatToCC } = useCurrencyContext();

  const [numberOfAssets, setNumberOfAssets] = useState(10);
  const assetsResponse = useGetAssets(numberOfAssets);
  const [maxInputAssets, setMaxInputAssets] = useState(numberOfAssets);
  const [inputError, setInputError] = useState(false);

  const maxAssets = 50;

  const getProfileAvatar = () => {
    if (user?.avatar?.url) {
      return user?.avatar.url;
    }
    return 'avatar-placeholder.jpg';
  };

  const copyAddress = (account: Account) => {
    navigator.clipboard.writeText(account?.address);
    alert.success(t('Wallet.account.copied'));
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value);
    setInputError(false);
    if (value > maxAssets) {
      value = maxAssets;
      setInputError(true);
    }
    setMaxInputAssets(value);
    setNumberOfAssets(value);
  };

  const climatecoinAsaID = Number(process.env.REACT_APP_CLIMATECOIN_ASA_ID);

  const tdStyles = 'py-2 items-center';

  const renderNfts = () => {
    if (assetsResponse?.isLoading) {
      return (
        <div className="p-4">
          <Spinner size="md" />
        </div>
      );
    }

    if (account?.assets && assetsResponse?.data?.assets) {
      return (
        <>
          {assetsResponse.data.assets.map((asset) => (
            <tbody key={asset['asset-id']}>
              <td className={tdStyles}>
                <div className="flex">
                  <span>{asset['asset-id']}</span>
                </div>
              </td>
              <td className={tdStyles}>
                <div className="flex">
                  <span className="text-xs text-neutral-4">{asset.name}</span>
                </div>
              </td>
              <td className={tdStyles}>
                <div className="flex flex-col">
                  <span>
                    {assetFormatter(asset.amount, asset.decimals) + ' ' + asset['unit-name']}
                  </span>
                  {asset['asset-id'] === climatecoinAsaID && (
                    <span className="text-xs text-neutral-4">
                      {formatter(climatecoinValue(Number(asset.amount)))}
                    </span>
                  )}
                </div>
              </td>
              <td className={tdStyles}>
                <div>
                  {asset['is-frozen'] ? (
                    <span className="text-primary-red">Yes</span>
                  ) : (
                    <span className="text-primary-brightGreen">No</span>
                  )}
                </div>
              </td>
              <td className={tdStyles}>
                <div className="flex justify-center">
                  <AssetAction
                    asset={asset}
                    address={account?.address}
                    disabled={asset['is-frozen']}
                    type="send"
                  />
                  {/* <AssetAction
                    asset={asset}
                    address={account?.address}
                    disabled={asset['is-frozen']}
                    className="pl-5"
                    type="remove"
                  /> */}
                </div>
              </td>
            </tbody>
          ))}
        </>
      );
    } else {
      return <>{t('Wallet.asset.error')}</>;
    }
  };

  const thStyles = 'flex text-sm items-center pb-3';

  return (
    <MainLayout title={t('head.Wallet.title')}>
      <div className="mt-16 grid  gap-8 md:grid-cols-4">
        <aside className="text-sm text-neutral-4">
          <img src={getProfileAvatar()} className="h-32 rounded-full" />
          <div className="mb-4 mt-8 flex flex-col capitalize ">
            <div className="text-2xl  text-black">
              {t('documents.Upload.hi')}
              {user?.name ? user?.name : user?.email && user?.email?.split('@')[0]} 👋🏻
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
                <>
                  <Card padding={'sm'} rounded="sm" shadow={false}>
                    <Title size={6} as={3} className="mb-12">
                      {t('Wallet.funds.title')}
                    </Title>
                    <div className="flex flex-col items-center space-y-4">
                      <div className="flex w-full justify-between text-sm text-neutral-4">
                        <div>
                          <span> {t('Wallet.span')} #1 </span>
                        </div>
                        <div className="justify-items-end font-bold text-black">
                          <span className="px-4">{account?.address}</span>
                          <button
                            className="text-primary-calmGreen"
                            onClick={() => copyAddress(account)}
                          >
                            {t('Wallet.copy')}
                          </button>
                        </div>
                      </div>
                      <hr className="w-full" />
                      <div className="flex w-full flex-row space-x-20 pt-4">
                        {/* TO DO: in this moment we only have ClimateCoins and Algos.
                      The function getCoinsList() is made to show more coins when they exist in the wallet
                      The function should receive an array of objects with label and value*/}
                        {/* {<CoinsList coinsList={account?.coins} />} */}
                        <div className="flex w-1/3 flex-col items-center">
                          <ul className="flex w-full flex-col space-y-4">
                            <div className="flex w-full justify-between">
                              <li className="text-neutral-4">Algos</li>
                              <li>{algoBalance()}</li>
                            </div>
                          </ul>
                        </div>
                        <div className={clsx('flex flex-row space-x-3')}>
                          <Link
                            href={`${EXPLORER_URL}address/${encodeURIComponent(
                              account?.address as string
                            )}`}
                            className="inline-flex items-center font-bold no-underline"
                          >
                            <Button type="button" className="bg-neutral-7" variant="grey" size="sm">
                              {t('Wallet.button.view')}
                            </Button>
                          </Link>
                          <SendFunds account={account} className="pl-5" type="add" />
                          <SendFunds account={account} className="pl-5" type="send" />
                        </div>
                      </div>
                    </div>
                  </Card>
                  <div className="mt-12">
                    <Card padding={'sm'} rounded="sm" shadow={false}>
                      <div>
                        <form onSubmit={(e) => e.preventDefault()}>
                          <div className="items-left flex flex-col space-y-3">
                            <Title size={6} as={3} className="mb-12">
                              {t('Wallet.table.title')}
                            </Title>

                            <div className="flex w-full items-center justify-between pb-6">
                              <div className="flex w-full items-center">
                                <span className="mr-12 text-neutral-4">ClimateCoins</span>
                                <span className="text-4xl text-primary-brightGreen">
                                  {formatToCC(climatecoinBalance())}
                                </span>
                              </div>
                              <div className="flex w-full items-center justify-end">
                                <Button
                                  type="button"
                                  className="bg-neutral-7"
                                  variant="grey"
                                  size="sm"
                                  disabled
                                >
                                  {t('Wallet.send.Climatecoins')}
                                </Button>
                              </div>
                            </div>

                            <div className="flex flex-col items-end text-sm">
                              <div>
                                <label htmlFor="numberOfAssets">{t('Wallet.filter.label')}</label>
                                <input
                                  type="number"
                                  name="numberOfAssets"
                                  required
                                  min={1}
                                  max={maxAssets}
                                  className="ml-2 max-w-fit rounded border-2 border-solid border-neutral-5 pl-1"
                                  defaultValue={numberOfAssets}
                                  onChange={onChangeHandler}
                                  value={maxInputAssets}
                                />
                              </div>
                              {inputError && (
                                <span className="text-primary-red">
                                  {t('Wallet.filter.error', {
                                    maxAssets,
                                  })}
                                </span>
                              )}
                            </div>
                            <table className="font-Poppins w-full text-sm font-medium text-primary">
                              <thead className="border-b-2 border-neutral-6 text-left text-xs text-neutral-4">
                                <th>
                                  <div className={clsx(thStyles)}>{t('Wallet.filter.assetID')}</div>
                                </th>
                                <th>
                                  <div className={clsx(thStyles)}>
                                    {t('compensate.History.table.type')}
                                  </div>
                                </th>
                                <th>
                                  <div className={clsx(thStyles)}>
                                    {t('compensate.History.table.amount')}
                                  </div>
                                </th>
                                <th>
                                  <div className={clsx(thStyles)}>{t('Wallet.filter.freeze')}</div>
                                </th>
                                <th className="flex justify-center">
                                  <div className={clsx(thStyles)}>{t('Wallet.filter.actions')}</div>
                                </th>
                              </thead>
                              {renderNfts()}
                            </table>
                          </div>
                        </form>
                      </div>
                    </Card>
                  </div>
                </>
              )}
            </Card>
          </div>
        </main>
      </div>
    </MainLayout>
  );
};
