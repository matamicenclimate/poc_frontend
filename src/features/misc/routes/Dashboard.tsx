import { MainLayout } from '@/componentes/Layout/MainLayout';
import { Link } from '@/componentes/Elements/Link/Link';
import { useTranslation } from 'react-i18next';
import { Breadcrumb } from '@/componentes/Elements/Breadcrumb/Breadcrumb';
import { Head } from '@/componentes/Layout/Head';
import { Title } from '@/componentes/Elements/Title/Title';
import { Button } from '@/componentes/Elements/Button/Button';
import { ReactComponent as ArrowRight } from '@/assets/icons/bx-arrow-right.svg';

export const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <MainLayout title={t('misc.Dashboard.title')}>
      <Breadcrumb />
      <Head title="Overview" />
      <Title size={4} as={1}>
        Overview
      </Title>
      <div className="grid md:grid-cols-3">
        <div className="flex h-[27.25rem] w-[21.8125rem] flex-col justify-end bg-gray-500 bg-overview-image bg-cover pr-[30px] pl-[30px] pb-6 align-bottom text-neutral-9 ">
          <Title size={4} as={3}>
            Your help against climate change.
          </Title>
          <p className="text-sm text-neutral-6">
            Use your climatecoins to help in the fight against climate change.
          </p>
          <div className="mt-8 h-[3rem] w-[9.0625rem]">
            <Button
              size="sm"
              iconRight={<ArrowRight className="ml-1" />}
              variant="light"
              type={undefined}
            >
              View more
            </Button>
          </div>
        </div>
        <div className="col-span-2" />
      </div>
      <div className="mt-12 flex flex-col justify-items-start border-2 border-black">
        <Link className="mb-2 mt-2 bg-secondary" to="/wallet">
          Wallet / 0 CLIMATE
        </Link>
        <Link className="mb-2 mt-2 bg-secondary" to="/documents/upload">
          {t('uploadDocuments.link')}
        </Link>
        <Link className="mb-2 mt-2 bg-secondary" to="/documents/list">
          documents
        </Link>
        <Link className="mb-2 mt-2 bg-secondary" to="/profile">
          profile
        </Link>
      </div>
    </MainLayout>
  );
};
