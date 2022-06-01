import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Card } from '@/componentes/Card/Card';
import { Button } from '@/componentes/Elements/Button/Button';
import { Title } from '@/componentes/Elements/Title/Title';
import { Input } from '@/componentes/Form/Inputs';
import { PageTitle } from '@/componentes/Layout/PageTitle';
import { useWalletContext } from '@/providers/Wallet.context';
import { useCalculateCompensation } from '../api/calculateCompensation';
import { useBurnClimatecoins } from '../api/burnClimatecoins';
import { CompensationCalculation } from '../types';
import { Dialog } from '@/componentes/Dialog/Dialog';
import { useGetCompensations } from '../api/getCompensations';
import { useAuth } from '@/lib/auth';
import { CompensationHistory } from '../components/CompensationHistory';
import { Spinner } from '@/componentes/Elements/Spinner/Spinner';
import OverviewImage from '@/assets/images/overview.jpg';
import { Link } from '@/componentes/Elements/Link/Link';
import { Icon } from '@/componentes/Icon/Icon';

export const Compensate = () => {
  const { t } = useTranslation();
  const { climatecoinBalance } = useWalletContext();
  const calculateCompensation = useCalculateCompensation();
  const compensations = useGetCompensations();
  const burnClimatecoins = useBurnClimatecoins();
  const [oracleResponse, setOracleResponse] = useState<null | CompensationCalculation>(null);
  const methods = useForm<any>({
    mode: 'onBlur',
  });

  const baseInputProps = {
    register: methods.register,
    control: methods.control,
    errors: methods.formState.errors,
    wrapperClassName: 'col-span-2',
  };

  const handleSubmit = (data: any) => {
    calculateCompensation
      .mutateAsync(data.amount)
      .then((oracleTxn) => setOracleResponse(oracleTxn));
  };

  const handleConfirmation = () => {
    if (!oracleResponse) return;
    burnClimatecoins
      .mutateAsync({
        ...oracleResponse,
      })
      .then(() => {
        setOracleResponse(null);
        methods.reset();
      });
  };

  return (
    <>
      <PageTitle
        title={t('climatecoins.Compensate.title')}
        description={t('climatecoins.Compensate.description')}
        linkTo=""
      />
      <div className="grid gap-8 md:grid-cols-3">
        <div className="flex flex-col space-y-8 md:col-span-2">
          <Card>
            <Title size={5} as={2}>
              {t('climatecoins.Compensate.card.title')}
            </Title>
            <form className="space-y-5" onSubmit={methods.handleSubmit(handleSubmit)}>
              <Input
                {...baseInputProps}
                wrapperClassName="col-span-1"
                label={t('climatecoins.Compensate.amount.label')}
                name="amount"
                type="number"
                required
                max={climatecoinBalance()}
                placeholder={'0'}
              />

              {/*<span className="flex items-center font-normal text-primary">*/}
              {/*  {t('intlNumber', {*/}
              {/*    val: climatecoinBalance(),*/}
              {/*  })}{' '}*/}
              {/*  CC*/}
              {/*</span>*/}

              <div className="flex items-center space-x-4">
                <Button type="submit" size="md" disabled={calculateCompensation.isLoading}>
                  {t('climatecoins.Compensate.button')}
                </Button>
                {calculateCompensation.isLoading && <Spinner size="md" />}
              </div>
            </form>
          </Card>
          <CompensationHistory data={compensations} />
        </div>
        <div>
          <div
            className="flex h-[27.25rem] flex-col justify-end rounded-xl bg-cover bg-center px-8 pb-6 text-neutral-9 "
            style={{ backgroundImage: `url(${OverviewImage})` }}
          >
            <Title size={4} as={3}>
              {t('components.Overview.viewMore.title')}
            </Title>
            <p className="text-sm text-neutral-6">{t('components.Overview.viewMore.subtitle')}</p>
            <div className="mt-8 ">
              <Link
                size="sm"
                iconRight={<Icon id="arrow-right" className="ml-1 h-4 w-4" />}
                variant="light"
                to="/"
                as="button"
              >
                {t('components.Overview.viewMore.link')}
              </Link>
            </div>
          </div>
        </div>
        <Dialog
          size="xs"
          isOpen={!!oracleResponse}
          setIsOpen={() => setOracleResponse(null)}
          onAccept={handleConfirmation}
          isLoading={burnClimatecoins.isLoading}
          title={'Are you sure'}
          claim={'Lorem ipsum dolor sit amet'}
        ></Dialog>
      </div>
    </>
  );
};
