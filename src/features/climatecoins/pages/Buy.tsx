import { useTranslation } from 'react-i18next';

import { Card } from '@/componentes/Card/Card';
import { Title } from '@/componentes/Elements/Title/Title';
import { PageTitle } from '@/componentes/Layout/PageTitle';
import { Stepper, useStepper } from '@/componentes/Stepper/Stepper';

enum BuySteps {
  SELECT = 0,
  CONDITIONS = 1,
  CONFIRMATION = 2,
}

export const Buy = () => {
  const { t } = useTranslation();
  const { currStep, nextStep, prevStep, setCurrStep } = useStepper(BuySteps);

  return (
    <>
      {' '}
      <PageTitle
        title={t('climatecoins.Buy.title')}
        description={t('climatecoins.Buy.description')}
        linkTo=""
      />
      <div className="grid md:grid-cols-3">
        <div id="left-column-wrapper" className="">
          <Stepper
            stepsEnum={BuySteps}
            setCurrStep={setCurrStep}
            currStep={currStep}
            translationRoot="climatecoins.Buy.stepper"
          />
        </div>
        <div className="md:col-span-2">
          {currStep === BuySteps.SELECT ? (
            <Card>
              <Title size={5} as={2}>
                {t('climatecoins.Buy.stepper.SELECT')}
              </Title>
            </Card>
          ) : null}
          {currStep === BuySteps.CONDITIONS ? (
            <Card>
              <Title size={5} as={2}>
                {t('climatecoins.Buy.stepper.CONDITIONS')}
              </Title>
            </Card>
          ) : null}
          {currStep === BuySteps.CONFIRMATION ? (
            <Card>
              <Title size={5} as={2}>
                {t('climatecoins.Buy.stepper.CONFIRMATION')}
              </Title>
            </Card>
          ) : null}
        </div>
      </div>
    </>
  );
};
