import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/lib/auth';

import { Button } from '@/componentes/Elements/Button/Button';
import { MainLayout } from '@/componentes/Layout/MainLayout';
import { Dialog } from '@/componentes/Dialog/Dialog';
import { Form } from '@/componentes/Form/Form';
import { Input } from '@/componentes/Form/Inputs';
import { Select, SelectOption } from '@/componentes/Form/Select';

import { uploadDocument } from '../api/uploadDocument';
import { getFormOptions, FormOption } from '../api/getFormOptions';
import { validationSchema } from '../validation/FormValidation';
import { Title } from '@/componentes/Elements/Title/Title';
import clsx from 'clsx';
import { Card } from '@/componentes/Card/Card';
import useYupValidationResolver from '@/componentes/Form/useValidationResolver';
import { useForm } from 'react-hook-form';
import FileInput from '@/componentes/Form/FileInput';

const formOptionToSelectOption = (options: FormOption[] | undefined): SelectOption[] => {
  if (options === undefined) return [];
  return options.map((option) => ({
    value: option.id,
    label: option.name,
  }));
};

function useStepper(maxSteps: number) {
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
  const methods = useForm({ resolver, mode: 'onBlur' });

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
        <Button type="submit" size="md" disabled={uploadDocuments.isLoading}>
          {t('uploadDocuments.send.button')} ad
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
      <div>
        <Title size={1} className="mb-4">
          {t('uploadDocuments.title')}
        </Title>
      </div>
      <div className="grid md:grid-cols-3">
        <div id="left-column-wrapper" className="">
          <div>
            {[
              'Project info',
              'Project details',
              'Configuration',
              'Upload files',
              'Confirmation',
            ].map((title, index) => (
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
                      'flex h-8 w-8 items-center justify-center rounded-full border-2',
                      currStep === index && 'border-green-600',
                      currStep > index && 'border-green-600 bg-green-600 text-white'
                    )}
                  >
                    {index + 1}
                  </div>
                  <div className="flex items-center">{title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="md:col-span-2">
          <form onSubmit={methods.handleSubmit(handleSubmit)}>
            {currStep === UploadSteps.INFO ? (
              <Card>
                <Title size={4}>Project Info</Title>
                <div className="grid grid-cols-2">
                  <Select
                    {...{
                      ...baseInputProps,
                      name: 'project_types',
                      options: formOptionToSelectOption(formOption.data?.['project-types']),
                      label: t('uploadDocuments.project.type'),
                    }}
                    required
                  />
                  <Select
                    {...{
                      ...baseInputProps,
                      options: formOptionToSelectOption(formOption.data?.countries),
                      label: t('uploadDocuments.country'),
                      name: 'country',
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
                  <Input
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
            <div className={clsx(currStep === UploadSteps.DETAILS ? 'block' : 'hidden')}>
              <Card>
                <Title size={4}>Project Details</Title>
                <div className="grid grid-cols-2">
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

                  <Input
                    {...baseInputProps}
                    label={t('uploadDocuments.projectThumbnail')}
                    required
                    name="thumbnail"
                    type="file"
                    accept={'.png' || '.jpg' || '.jpeg'}
                  />

                  <Input
                    {...baseInputProps}
                    label={t('uploadDocuments.projectCover')}
                    required
                    name="cover"
                    type="file"
                    accept={'.png' || '.jpg' || '.jpeg'}
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
            </div>
            {currStep === UploadSteps.CONFIG ? (
              <Card>
                <Title size={4}>Project Details</Title>
                <div className="grid grid-cols-2">
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
            <div className={clsx(currStep === UploadSteps.FILES ? 'block' : 'hidden')}>
              <Card>
                <Title size={4}>Project Details</Title>
                <div className="grid grid-cols-2">
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
                  />{' '}
                  <StepperNavigation />
                </div>
              </Card>
            </div>
            {currStep === UploadSteps.CONFIRMATION ? (
              <Card>
                <Title size={4}>Project Details</Title>
                <div className="grid grid-cols-2">
                  {' '}
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
