import clsx from 'clsx';
import { ReactComponent as CheckIcon } from '@/assets/icons/bx-check-line.svg';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export function useStepper<Obj>(someEnum: Obj) {
  const [currStep, setCurrStep] = useState<number>(0);
  const [stepEnum] = useState<Obj>(someEnum);
  const maxSteps = enumToKeys(someEnum).length;
  const nextStep = () => setCurrStep((old) => Math.min(old + 1, maxSteps - 1));
  const prevStep = () => setCurrStep((old) => Math.max(old - 1, 1));

  return { currStep, nextStep, prevStep, setCurrStep };
}

function enumToKeys<Obj>(someEnum: Obj) {
  return Object.keys(someEnum).filter((val: any) => isNaN(val));
}

type StepperProps<Obj> = {
  stepsEnum: Obj;
  setCurrStep: React.Dispatch<React.SetStateAction<number>>;
  currStep: number;
  translationRoot: string;
};
export function Stepper<Obj>({
  stepsEnum,
  setCurrStep,
  currStep,
  translationRoot,
}: StepperProps<Obj>) {
  const { t } = useTranslation();

  return (
    <div>
      {enumToKeys(stepsEnum).map((title, index) => (
        <div key={index}>
          {index !== 0 ? (
            <div>
              <div className="ml-6 h-6 w-px border-r-2 border-dashed"></div>
            </div>
          ) : null}
          <div
            key={index}
            onClick={() => setCurrStep(index)}
            className="flex w-60 cursor-pointer gap-4 rounded-full p-2 text-sm shadow-sm"
          >
            <div
              className={clsx(
                'flex h-7 w-7 items-center justify-center rounded-full border-2',
                currStep === index && 'border-primary-green',
                currStep > index && 'border-primary-green bg-primary-green text-white'
              )}
            >
              {currStep > index ? <CheckIcon /> : index + 1}
            </div>
            <div className="flex items-center">{t(`${translationRoot}.${title}`)}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
