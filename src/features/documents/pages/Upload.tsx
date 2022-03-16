import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/lib/auth';

import { Button } from '@/componentes/Elements/Button/Button';
import { MainLayout } from '@/componentes/Layout/MainLayout';
import { Dialog } from '@/componentes/Dialog/Dialog';
import { Input, Textarea } from '@/componentes/Form/Inputs';
import { Select, SelectOption } from '@/componentes/Form/Select';

import { uploadDocument } from '../api/uploadDocument';
import { getFormOptions, FormOption } from '../api/getFormOptions';
import { validationSchema } from '../validation/UploadValidation';
import { Title } from '@/componentes/Elements/Title/Title';
import clsx from 'clsx';
import { Card } from '@/componentes/Card/Card';
import useYupValidationResolver from '@/componentes/Form/useValidationResolver';
import { useForm } from 'react-hook-form';
import FileInput from '@/componentes/Form/FileInput';
import { Link } from '@/componentes/Elements/Link/Link';
import { ReactComponent as CheckIcon } from '@/assets/icons/bx-check-line.svg';
import { ProjectPreview } from '../components/ProjectPreview';
import { Switch } from '@/componentes/Form/Switch';
import { PageTitle } from '@/componentes/Layout/PageTitle';
import { Stepper } from '@/componentes/Stepper/Stepper';

const formOptionToSelectOption = (options: FormOption[] | undefined): SelectOption[] => {
  if (options === undefined) return [];
  return options.map((option) => ({
    value: option.id,
    label: option.name,
  }));
};

export function useStepper(maxSteps: number) {
  const [currStep, setCurrStep] = useState(0);
  const nextStep = () => setCurrStep((old) => Math.min(old + 1, maxSteps - 1));
  const prevStep = () => setCurrStep((old) => Math.max(old - 1, 1));

  return { currStep, nextStep, prevStep, setCurrStep };
}

enum UploadSteps {
  INFO = 0,
  DETAILS = 1,
  CONFIG = 2,
  FILES = 3,
  CONFIRMATION = 4,
}

export const Upload = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const resolver = useYupValidationResolver(validationSchema);
  const methods = useForm<any>({ resolver, mode: 'onBlur' });

  const uploadDocuments = uploadDocument();
  const formOption = getFormOptions();
  const user = useAuth();
  const { currStep, nextStep, prevStep, setCurrStep } = useStepper(Object.keys(UploadSteps).length);

  const handleSubmit = async (data: Record<string, any>) => {
    await uploadDocuments.mutateAsync(data);
    setIsOpen((old) => !old);
  };

  const baseInputProps = {
    register: methods.register,
    control: methods.control,
    errors: methods.formState.errors,
    wrapperClassName: 'col-span-2',
  };

  const StepperNavigation = () => (
    <>
      {currStep !== 0 ? (
        <Button variant="light" type={undefined} onClick={prevStep}>
          Back
        </Button>
      ) : (
        <div />
      )}
      {currStep === UploadSteps.CONFIRMATION ? (
        <Button
          type="submit"
          size="md"
          disabled={uploadDocuments.isLoading || !methods.watch('confirmation')}
        >
          {t('uploadDocuments.send.button')}
        </Button>
      ) : (
        <Button type={undefined} onClick={nextStep}>
          Continue
        </Button>
      )}
    </>
  );

  return (
    <MainLayout title={t('head.Upload.title')}>
      <PageTitle
        title={t('documents.Upload.title')}
        description={t('documents.Upload.description')}
        linkTo=""
      />
      <div className="grid md:grid-cols-3">
        <div id="left-column-wrapper" className="">
          <Stepper
            stepsEnum={UploadSteps}
            setCurrStep={setCurrStep}
            currStep={currStep}
            translationRoot="documents.Upload.stepper"
          />
        </div>
        <div className="md:col-span-2">
          <form onSubmit={methods.handleSubmit(handleSubmit)}>
            {currStep === UploadSteps.INFO ? (
              <Card>
                <Title size={5} as={2}>
                  {t('documents.Upload.stepper.INFO')}
                </Title>
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <Select
                    {...{
                      ...baseInputProps,
                      name: 'project_types',
                      options: formOptionToSelectOption(formOption.data?.['project-types']),
                      label: t('uploadDocuments.project.type'),
                      wrapperClassName: '',
                    }}
                    required
                  />
                  <Select
                    {...{
                      ...baseInputProps,
                      options: formOptionToSelectOption(formOption.data?.countries),
                      label: t('uploadDocuments.country'),
                      name: 'country',
                      wrapperClassName: '',
                    }}
                    required
                  />
                  <Select
                    {...{ ...baseInputProps }}
                    label={t('uploadDocuments.sdgs')}
                    name="sdgs"
                    options={formOptionToSelectOption(formOption.data?.sdgs)}
                    isMulti
                  />
                  <Input
                    {...{ ...baseInputProps }}
                    label={t('uploadDocuments.project.title')}
                    required
                    name="title"
                    type="text"
                  />
                  <Textarea
                    {...{ ...baseInputProps }}
                    label={t('uploadDocuments.description')}
                    required
                    name="description"
                    type="text"
                  />
                  <Input
                    {...baseInputProps}
                    label={t('uploadDocuments.project.url')}
                    required
                    name="project_url"
                    type="text"
                  />
                  <StepperNavigation />
                </div>
              </Card>
            ) : null}
            {/** Hide the DIV with css instead of unmounting it so that we dont loose the value of the FileInputs */}
            {currStep === UploadSteps.DETAILS ? (
              <Card>
                <Title size={5} as={2}>
                  {t('documents.Upload.stepper.DETAILS')}
                </Title>
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <Input
                    {...baseInputProps}
                    wrapperClassName="col-span-1"
                    label={t('uploadDocuments.projectLatitude')}
                    name="project_latitude"
                    type="number"
                    step="any"
                  />

                  <Input
                    {...baseInputProps}
                    wrapperClassName="col-span-1"
                    label={t('uploadDocuments.projectLongitude')}
                    name="project_longitude"
                    type="number"
                    step="any"
                  />
                  <FileInput
                    {...baseInputProps}
                    label={t('uploadDocuments.projectThumbnail')}
                    required
                    name="thumbnail"
                    accept={'.png, .jpg, .jpeg'}
                  />
                  <FileInput
                    {...baseInputProps}
                    label={t('uploadDocuments.projectCover')}
                    required
                    name="cover"
                    accept={'.png, .jpg, .jpeg'}
                  />
                  <Input
                    {...baseInputProps}
                    label={t('uploadDocuments.credits.amount')}
                    required
                    name="credits"
                    type="number"
                  />
                  <Input
                    {...baseInputProps}
                    label={t('uploadDocuments.serialNumber')}
                    required
                    name="serial_number"
                    type="text"
                  />
                  <Input
                    {...baseInputProps}
                    label={t('uploadDocuments.project.registration')}
                    required
                    name="project_registration"
                    type="date"
                  />

                  <Input
                    {...baseInputProps}
                    label={t('uploadDocuments.project.video')}
                    name="project_video"
                    type="text"
                  />
                  <StepperNavigation />
                </div>
              </Card>
            ) : null}
            {currStep === UploadSteps.CONFIG ? (
              <Card>
                <Title size={5} as={2}>
                  {t('documents.Upload.stepper.CONFIG')}
                </Title>
                <div className="mt-8 grid grid-cols-2 gap-4">
                  {' '}
                  <Input
                    {...baseInputProps}
                    wrapperClassName="col-span-1"
                    label={t('uploadDocuments.project.creditStart')}
                    required
                    name="credit_start"
                    type="date"
                  />
                  <Input
                    {...baseInputProps}
                    wrapperClassName="col-span-1"
                    label={t('uploadDocuments.project.creditEnd')}
                    required
                    name="credit_end"
                    type="date"
                  />
                  <Select
                    {...baseInputProps}
                    wrapperClassName="col-span-1"
                    label={t('uploadDocuments.type')}
                    required
                    name="types"
                    options={formOptionToSelectOption(formOption.data?.types)}
                  />
                  <Select
                    {...baseInputProps}
                    wrapperClassName="col-span-1"
                    label={t('uploadDocuments.subtype')}
                    required
                    name="sub_type"
                    options={formOptionToSelectOption(formOption.data?.['sub-types'])}
                  />
                  <Select
                    {...baseInputProps}
                    wrapperClassName="col-span-1"
                    label={t('uploadDocuments.methodology')}
                    name="methodology"
                    options={formOptionToSelectOption(formOption.data?.methodologies)}
                  />
                  <Select
                    {...baseInputProps}
                    wrapperClassName="col-span-1"
                    label={t('uploadDocuments.validator')}
                    name="validator"
                    options={formOptionToSelectOption(formOption.data?.validators)}
                  />
                  <Select
                    {...baseInputProps}
                    wrapperClassName="col-span-1"
                    label={t('uploadDocuments.firstVerifier')}
                    name="first_verifier"
                    options={formOptionToSelectOption(formOption.data?.['first-verifiers'])}
                  />
                  <Select
                    {...baseInputProps}
                    wrapperClassName="col-span-1"
                    label={t('uploadDocuments.standard')}
                    required
                    name="standard"
                    options={formOptionToSelectOption(formOption.data?.standards)}
                  />
                  <Select
                    {...baseInputProps}
                    wrapperClassName="col-span-1"
                    label={t('uploadDocuments.registry.name')}
                    required
                    name="registry"
                    options={formOptionToSelectOption(formOption.data?.registries)}
                  />
                  <Input
                    {...baseInputProps}
                    wrapperClassName="col-span-2"
                    label={t('uploadDocuments.registry.link')}
                    required
                    name="registry_url"
                    type="text"
                  />
                  <StepperNavigation />
                </div>
              </Card>
            ) : null}
            {currStep === UploadSteps.FILES ? (
              <Card>
                <Title size={5} as={2}>
                  {t('documents.Upload.stepper.FILES')}
                </Title>
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <FileInput
                    {...baseInputProps}
                    wrapperClassName="col-span-2"
                    label={t('uploadDocuments.PDD')}
                    required
                    name="pdd"
                    accept={'.pdf'}
                  />
                  <FileInput
                    {...baseInputProps}
                    wrapperClassName="col-span-2"
                    label={t('uploadDocuments.validation.report')}
                    name="validation_report"
                    accept={'.pdf'}
                  />
                  <FileInput
                    {...baseInputProps}
                    wrapperClassName="col-span-2"
                    label={t('uploadDocuments.monitoring.report')}
                    name="monitoring_report"
                    accept={'.pdf'}
                  />
                  <FileInput
                    {...baseInputProps}
                    label={t('uploadDocuments.verification.report')}
                    required
                    name="verification_report"
                    accept={'.pdf'}
                  />
                  <Input
                    {...baseInputProps}
                    wrapperClassName="col-span-2"
                    type="hidden"
                    name="created_by_user"
                    defaultValue={user.user?.email as string}
                  />
                  <StepperNavigation />
                </div>
              </Card>
            ) : null}
            {currStep === UploadSteps.CONFIRMATION ? (
              <Card>
                <Title size={5} as={2}>
                  {t(`documents.Upload.stepper.CONFIRMATION`)}
                </Title>
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <ProjectPreview values={methods.getValues()} />
                  </div>
                  <div className="col-span-2 text-xs">
                    <Switch
                      control={methods.control}
                      name="confirmation"
                      label={
                        <>
                          {t('documents.Upload.confirmationTextPre')}{' '}
                          <Link to="/terms-conditions">
                            {t('documents.Upload.confirmationTextLink')}
                          </Link>{' '}
                          {t('documents.Upload.confirmationTextPost')}
                        </>
                      }
                    />
                  </div>
                  <StepperNavigation />
                </div>
              </Card>
            ) : null}
          </form>

          <Dialog
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title={t('uploadDocuments.modal.title')}
            claim={t('uploadDocuments.modal.claim')}
            acceptLabel={t('uploadDocuments.modal.button.accept')}
          />
        </div>
      </div>
    </MainLayout>
  );
};
