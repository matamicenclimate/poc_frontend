import clsx from 'clsx';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Card } from '@/componentes/Card/Card';
import { Dl, DlItem } from '@/componentes/DescriptionList';
import { Button } from '@/componentes/Elements/Button/Button';
import { Link } from '@/componentes/Elements/Link/Link';
import { Spinner } from '@/componentes/Elements/Spinner/Spinner';
import { Title } from '@/componentes/Elements/Title/Title';
import { Input } from '@/componentes/Form/Inputs';
import { Select } from '@/componentes/Form/Select';
import { Stepper, useStepper } from '@/componentes/Stepper/Stepper';
import { useCurrencyContext } from '@/providers/Currency.context';
import { useWalletContext } from '@/providers/Wallet.context';

import { useBurnClimatecoins } from '../api/burnClimatecoins';
import { useCalculateCompensation } from '../api/calculateCompensation';
import { CompensationCalculation } from '../types';
import { CalculateCompensationSchema } from '../validation/CompensateValidation';

export enum CompensateSteps {
  INITIAL = 0,
  CONFIRMATION = 1,
  SUCCESS = 2,
}
export const CompensateForm = ({ defaultAddress }: { defaultAddress: string }) => {
  const { t } = useTranslation();
  const { account, climatecoinBalance } = useWalletContext();
  const calculateCompensation = useCalculateCompensation();
  const burnClimatecoins = useBurnClimatecoins();
  const { formatter, climatecoinValue } = useCurrencyContext();

  const [oracleResponse, setOracleResponse] = useState<null | CompensationCalculation>(null);
  const methods = useForm<CalculateCompensationSchema>({
    mode: 'onBlur',
    defaultValues: {
      wallet: { value: defaultAddress as any, label: defaultAddress as any },
    },
  });

  const baseInputProps = {
    register: methods.register,
    control: methods.control,
    errors: methods.formState.errors,
    wrapperClassName: 'col-span-2',
  };

  const handleSubmit = (data: any) => {
    Promise.all([
      nextStep(),
      calculateCompensation.mutateAsync(data.amount).then((oracleTxn) => {
        setOracleResponse(oracleTxn);
      }),
    ]).catch(() => setCurrStep(CompensateSteps.INITIAL));
  };
  const navigate = useNavigate();

  const handleConfirmation = () => {
    if (!oracleResponse) return Promise.reject('No oracle response');
    burnClimatecoins.mutate(
      {
        ...oracleResponse,
      },
      {
        onSuccess: (res) => {
          setOracleResponse(null);
          navigate(`/coins/compensate/${res.id}`);
        },
      }
    );
  };

  const { currStep, nextStep, prevStep, setCurrStep } = useStepper(CompensateSteps);

  const amountPills = [10, 25, 50, climatecoinBalance()];

  return (
    <div className="grid gap-8 md:grid-cols-3">
      <div>
        <Stepper
          stepsEnum={CompensateSteps}
          setCurrStep={setCurrStep}
          currStep={currStep}
          translationRoot="compensations.Compensate.stepper"
          disableFutureSteps={true}
        />
      </div>
      <div className="flex flex-col space-y-8 md:col-span-2">
        {currStep === CompensateSteps.INITIAL && (
          <Card>
            <Title size={5} as={2}>
              {t('compensations.Compensate.card.title')}
            </Title>
            <form className="mt-6 space-y-8" onSubmit={methods.handleSubmit(handleSubmit)}>
              <Select
                name="wallet"
                label={t('compensations.Compensate.wallet.label')}
                required
                options={[{ value: account?.address, label: account?.address ?? '' }]}
                {...baseInputProps}
              />
              <div className="space-y-2">
                <div className="relative flex items-center justify-center">
                  <div
                    className={clsx('absolute z-10 -mt-4 text-2xl font-bold')}
                    style={{
                      marginLeft: `-${
                        (typeof methods.watch('amount') === 'undefined'
                          ? 4
                          : methods.watch('amount').toString().length > 7
                          ? 7
                          : methods.watch('amount').toString().length < 4
                          ? 4
                          : methods.watch('amount').toString().length) * 4.5
                      }rem`,
                    }}
                  >
                    CC
                  </div>
                  <Input
                    {...baseInputProps}
                    wrapperClassName="col-span-1"
                    label={t('compensations.Compensate.amount.label')}
                    name="amount"
                    type="number"
                    required
                    min={1}
                    max={climatecoinBalance()}
                    inputClassName="border-0 text-[5rem] w-full text-center "
                    placeholder={'1'}
                  />
                </div>
                <div className="text-center text-xl">
                  {formatter(climatecoinValue(methods.watch('amount')))}
                </div>

                <div className="flex justify-center gap-4">
                  {amountPills.map((amt, i) => (
                    <Button
                      type="button"
                      key={amt}
                      variant={'light'}
                      size="xs"
                      onClick={() => {
                        methods.setValue(
                          'amount',
                          amt === climatecoinBalance()
                            ? climatecoinBalance()
                            : Math.round((amt * climatecoinBalance()) / 100)
                        );
                      }}
                    >
                      {i === amountPills.length - 1 ? `Max ( ${amt} )` : `${amt} %`}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-center space-x-4">
                <Button type="submit" size="md" disabled={calculateCompensation.isLoading}>
                  {t('compensations.Compensate.button')}
                </Button>
              </div>
            </form>
          </Card>
        )}
        {currStep === CompensateSteps.CONFIRMATION && (
          <Card>
            <div className="space-y-8">
              <Title size={5} as={2}>
                {t('compensations.Compensate.steps.accept.title')}
              </Title>
              <p className="text-sm text-neutral-4">
                {t('compensations.Compensate.steps.accept.description', {
                  amount: t('intlNumber', { val: methods.getValues('amount') }),
                })}{' '}
                <Link to="/">Read more</Link>
              </p>
              <Dl>
                <DlItem
                  dt={'Total coins to compensate'}
                  dd={`${t('intlNumber', { val: methods.getValues('amount') })} cc`}
                  ddClassNames="text-primary-green"
                />
                <DlItem
                  dt={'Total'}
                  dd={formatter(climatecoinValue(methods.getValues('amount')))}
                />
                <hr className="col-span-2" />
                <DlItem
                  dt={'Wallet address'}
                  dd={
                    account?.address
                      ? `${account.address?.slice(0, 15)}...${account.address?.slice(-15)}`
                      : ''
                  }
                  fullWidth
                />
              </Dl>
              <div className="grid grid-cols-3 gap-4">
                <div></div>
                <div className="flex items-center justify-end">
                  {(calculateCompensation.isLoading || burnClimatecoins.isLoading) && (
                    <Spinner size="md" />
                  )}
                </div>
                <Button
                  disabled={calculateCompensation.isLoading || burnClimatecoins.isLoading}
                  onClick={handleConfirmation}
                >
                  {t('documents.Upload.stepper.continue')}
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};
