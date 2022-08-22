import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { Card } from '@/componentes/Card/Card';
import { DataRenderer } from '@/componentes/DataRenderer/DataRenderer';
import { Link } from '@/componentes/Elements/Link/Link';
import { Title } from '@/componentes/Elements/Title/Title';
import { Icon } from '@/componentes/Icon/Icon';
import { Aside, menuProps } from '@/componentes/Layout/Aside/Aside';
import { MainLayout } from '@/componentes/Layout/MainLayout';
import { CarbonDocument } from '@/features/documents';

import { useGetDocument } from '../api/useGetDocument';

export const DocumentTransactions = () => {
  const { documentId } = useParams();
  const { t } = useTranslation();
  const document = useGetDocument(documentId as string);

  const notifications: menuProps[] = [
    {
      icon: 'email-line',
      activeIcon: 'email-line',
      label: t('documents.Details.menu.notifications'),
      to: '/notifications',
    },
  ];
  const projectMenu: menuProps[] = [
    {
      icon: 'shopping-bag',
      activeIcon: 'shopping-bag',
      label: t('documents.Details.menu.projectDetails'),
      to: `/documents/${document?.data?.id}`,
    },
    {
      icon: 'arrow-right-line',
      activeIcon: 'arrow-right-line',
      label: t('documents.Details.menu.offers'),
      to: '/notifications',
    },
    {
      icon: 'wallet-line',
      activeIcon: 'wallet-line',
      label: t('documents.Details.menu.projectWallet'),
      to: '/wallet',
    },
  ];

  return (
    <MainLayout>
      <div className="my-10 flex flex-row items-center ">
        <Link to="/documents/list" className="text-neutral-5 no-underline hover:text-neutral-4">
          <Title size={3} as={1}>
            {t('documents.transactions.detail.title')}
          </Title>
        </Link>
        <Icon id="arrow-right-neutral-5" className="h-14 w-14" />
        <Title size={3} as={1} className="text-black">
          {document?.data?.title}
        </Title>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <aside className="text-sm text-neutral-4 md:pr-14">
          <div
            style={{ backgroundImage: `url(${document.data?.thumbnail?.url})` }} // alt={document.data?.title}
            className="h-56 w-full rounded-lg bg-neutral-6 bg-cover bg-center "
          />
          <div className="mb-4 mt-5 flex flex-col capitalize ">
            <div className="text-2xl text-black">{document.data?.status}</div>
            <div className="mt-2 text-lg text-neutral-5">{document.data?.id}</div>
          </div>
          <hr />
          <Aside menu={projectMenu} />
          <hr />
          <Aside menu={notifications} />
        </aside>
        <div className="space-y-4 md:col-span-2">
          <DataRenderer<CarbonDocument>
            data={document}
            render={(document) => (
              <div className="space-y-8">
                <Card>
                  <table className="font-Poppins w-full text-sm font-medium text-neutral-4">
                    <thead className="border-b-2 border-neutral-6 text-left text-xs text-neutral-4">
                      <th>TxID</th>

                      <th>Amount </th>
                      <th>From </th>
                      <th>To </th>
                      <th>Fee </th>
                      <th>Type </th>
                    </thead>
                    <tbody>
                      <tr key={document._id} className="text-left">
                        <td>{document.developer_nft.asa_txn_id.slice(0, 10)}...</td>
                        <td>{document.developer_nft.supply}</td>
                        <td>{document.developer_nft.owner_address.slice(0, 10)}...</td>
                        <td>{document.fee_nft.owner_address.slice(0, 10)}...</td>
                        <td>{document.fee_nft.supply}</td>
                        <td>0</td>
                      </tr>
                    </tbody>
                  </table>
                </Card>
              </div>
            )}
          />
        </div>
      </div>
    </MainLayout>
  );
};
