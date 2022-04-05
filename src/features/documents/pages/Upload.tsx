import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/lib/auth';

import { Button } from '@/componentes/Elements/Button/Button';
import { MainLayout } from '@/componentes/Layout/MainLayout';
import { Dialog } from '@/componentes/Dialog/Dialog';
import { Input, Textarea } from '@/componentes/Form/Inputs';
import { Select } from '@/componentes/Form/Select';

import { uploadDocument } from '../api/uploadDocument';
import { getFormOptions, FormOption } from '../api/getFormOptions';
import { documentUploadValidationSchema, UploadFormSchema } from '../validation/UploadValidation';
import { Title } from '@/componentes/Elements/Title/Title';
import { Card } from '@/componentes/Card/Card';
import useYupValidationResolver from '@/componentes/Form/useValidationResolver';
import { useForm } from 'react-hook-form';
import FileInput from '@/componentes/Form/FileInput';
import { Link } from '@/componentes/Elements/Link/Link';
import { ProjectPreview } from '../components/ProjectPreview';
import { Switch } from '@/componentes/Form/Switch';
import { PageTitle } from '@/componentes/Layout/PageTitle';
import { enumToKeys, Stepper, useStepper } from '@/componentes/Stepper/Stepper';
import { SelectOption } from '@/componentes/Form';
import { useNavigate } from 'react-router-dom';

const formOptionToSelectOption = (options: FormOption[] | undefined): SelectOption[] => {
  if (options === undefined) return [];
  return options.map((option) => ({
    value: option.id,
    label: option.name,
  }));
};

export enum UploadSteps {
  INFO = 0,
  DETAILS = 1,
  CONFIG = 2,
  FILES = 3,
  CONFIRMATION = 4,
}

export const Upload = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const resolver = useYupValidationResolver(documentUploadValidationSchema);
  const methods = useForm<UploadFormSchema>({
    resolver,
    mode: 'onBlur',
  });

  const uploadDocuments = uploadDocument();
  const formOption = getFormOptions();
  const user = useAuth();
  const { currStep, nextStep, prevStep, setCurrStep } = useStepper(UploadSteps);
  const navigate = useNavigate();
  const handleSubmit = async (data: UploadFormSchema) => {
    console.log({ data });

    const res = await uploadDocuments.mutateAsync(data);
    // setIsOpen((old) => !old);
    // but you can use a location instead
    navigate(`/documents/${res._id}`);
  };

  const baseInputProps = {
    register: methods.register,
    control: methods.control,
    errors: methods.formState.errors,
    wrapperClassName: 'col-span-2',
  };

  // Se podria memoizar
  const StepperNavigation = () => (
    <div className="col-span-2 grid grid-cols-3">
      {currStep !== 0 ? (
        <Button variant="light" type={undefined} onClick={prevStep}>
          Back
        </Button>
      ) : (
        <div />
      )}
      <div />
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
    </div>
  );

  function getErrorFromKeys<FormSchema extends Record<string, unknown>>(
    array: (keyof FormSchema)[]
  ) {
    return array.reduce((acc, key) => {
      return acc || Object.keys(methods.formState.errors).includes(key as string);
    }, false as boolean);
  }

  return (
    <MainLayout title={t('head.Upload.title')}>
      <PageTitle
        title={t('documents.Upload.title')}
        description={t('documents.Upload.description')}
        linkTo="/"
      />
      <div className="grid md:grid-cols-3">
        <div id="left-column-wrapper" className="">
          <Stepper
            stepsEnum={UploadSteps}
            errors={{
              INFO: getErrorFromKeys<UploadFormSchema>([
                'title',
                'country',
                'sdgs',
                'title',
                'description',
                'project_url',
              ]),
              CONFIG: getErrorFromKeys<UploadFormSchema>([
                'credit_start',
                'credit_end',
                'type',
                'sub_type',
                'methodology',
                'validators',
                'first_verifier',
                'standard',
                'registry',
                'registry_url',
              ]),
              DETAILS: getErrorFromKeys<UploadFormSchema>([
                'project_latitude',
                'project_longitude',
                'thumbnail',
                'cover',
                'credits',
                'serial_number',
                'project_registration',
                'project_video',
              ]),
              FILES: getErrorFromKeys<UploadFormSchema>([
                'pdd',
                'validation_report',
                'monitoring_report',
                'verification_report',
              ]),
              CONFIRMATION: false,
            }}
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
                  <Select<UploadFormSchema>
                    {...{
                      ...baseInputProps,
                      name: 'project_type',
                      options: formOptionToSelectOption(formOption.data?.['project-types']),
                      label: t('uploadDocuments.project.type'),
                      wrapperClassName: '',
                    }}
                    required
                  />
                  <Select<UploadFormSchema>
                    {...{
                      ...baseInputProps,
                      options: formOptionToSelectOption(formOption.data?.countries),
                      label: t('uploadDocuments.country'),
                      name: 'country',
                      wrapperClassName: '',
                    }}
                    required
                  />
                  <Select<UploadFormSchema>
                    {...baseInputProps}
                    label={t('uploadDocuments.sdgs')}
                    name="sdgs"
                    options={formOptionToSelectOption(formOption.data?.sdgs)}
                    isMulti
                  />
                  <Input<UploadFormSchema>
                    {...baseInputProps}
                    label={t('uploadDocuments.project.title')}
                    required
                    name="title"
                    type="text"
                  />
                  <Textarea<UploadFormSchema>
                    {...baseInputProps}
                    label={t('uploadDocuments.description')}
                    required
                    name="description"
                    type="text"
                  />
                  <Input<UploadFormSchema>
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
                  <Input<UploadFormSchema>
                    {...baseInputProps}
                    wrapperClassName="col-span-1"
                    label={t('uploadDocuments.projectLatitude')}
                    name="project_latitude"
                    type="number"
                    step="any"
                    defaultValue={0}
                  />
                  <Input<UploadFormSchema>
                    {...baseInputProps}
                    wrapperClassName="col-span-1"
                    label={t('uploadDocuments.projectLongitude')}
                    name="project_longitude"
                    type="number"
                    step="any"
                    defaultValue={0}
                  />
                  <FileInput<UploadFormSchema>
                    {...baseInputProps}
                    label={t('uploadDocuments.projectThumbnail')}
                    required
                    name="thumbnail"
                    accept={'.png, .jpg, .jpeg'}
                  />
                  <FileInput<UploadFormSchema>
                    {...baseInputProps}
                    label={t('uploadDocuments.projectCover')}
                    required
                    name="cover"
                    accept={'.png, .jpg, .jpeg'}
                  />
                  <Input<UploadFormSchema>
                    {...baseInputProps}
                    label={t('uploadDocuments.credits.amount')}
                    required
                    name="credits"
                    type="number"
                  />
                  <Input<UploadFormSchema>
                    {...baseInputProps}
                    label={t('uploadDocuments.serialNumber')}
                    required
                    name="serial_number"
                    type="text"
                  />
                  <Input<UploadFormSchema>
                    {...baseInputProps}
                    label={t('uploadDocuments.project.registration')}
                    required
                    name="project_registration"
                    type="date"
                  />

                  <Input<UploadFormSchema>
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
                  <Input<UploadFormSchema>
                    {...baseInputProps}
                    wrapperClassName="col-span-1"
                    label={t('uploadDocuments.project.creditStart')}
                    required
                    name="credit_start"
                    type="date"
                  />
                  <Input<UploadFormSchema>
                    {...baseInputProps}
                    wrapperClassName="col-span-1"
                    label={t('uploadDocuments.project.creditEnd')}
                    required
                    name="credit_end"
                    type="date"
                  />
                  <Select<UploadFormSchema>
                    {...baseInputProps}
                    wrapperClassName="col-span-1"
                    label={t('uploadDocuments.type')}
                    required
                    name="type"
                    options={formOptionToSelectOption(formOption.data?.types)}
                  />
                  <Select<UploadFormSchema>
                    {...baseInputProps}
                    wrapperClassName="col-span-1"
                    label={t('uploadDocuments.subtype')}
                    required
                    name="sub_type"
                    options={formOptionToSelectOption(formOption.data?.['sub-types'])}
                  />
                  <Select<UploadFormSchema>
                    {...baseInputProps}
                    wrapperClassName="col-span-1"
                    label={t('uploadDocuments.methodology')}
                    name="methodology"
                    options={formOptionToSelectOption(formOption.data?.methodologies)}
                  />
                  <Select<UploadFormSchema>
                    {...baseInputProps}
                    wrapperClassName="col-span-1"
                    label={t('uploadDocuments.validator')}
                    name="validators"
                    options={formOptionToSelectOption(formOption.data?.validators)}
                  />
                  <Select<UploadFormSchema>
                    {...baseInputProps}
                    wrapperClassName="col-span-1"
                    label={t('uploadDocuments.firstVerifier')}
                    name="first_verifier"
                    options={formOptionToSelectOption(formOption.data?.['first-verifiers'])}
                  />
                  <Select<UploadFormSchema>
                    {...baseInputProps}
                    wrapperClassName="col-span-1"
                    label={t('uploadDocuments.standard')}
                    required
                    name="standard"
                    options={formOptionToSelectOption(formOption.data?.standards)}
                  />
                  <Select<UploadFormSchema>
                    {...baseInputProps}
                    wrapperClassName="col-span-1"
                    label={t('uploadDocuments.registry.name')}
                    required
                    name="registry"
                    options={formOptionToSelectOption(formOption.data?.registries)}
                  />
                  <Input<UploadFormSchema>
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
                  <FileInput<UploadFormSchema>
                    {...baseInputProps}
                    wrapperClassName="col-span-2"
                    label={t('uploadDocuments.PDD')}
                    required
                    name="pdd"
                    accept={'.pdf'}
                  />
                  <FileInput<UploadFormSchema>
                    {...baseInputProps}
                    wrapperClassName="col-span-2"
                    label={t('uploadDocuments.validation.report')}
                    name="validation_report"
                    accept={'.pdf'}
                  />
                  <FileInput<UploadFormSchema>
                    {...baseInputProps}
                    wrapperClassName="col-span-2"
                    label={t('uploadDocuments.monitoring.report')}
                    name="monitoring_report"
                    accept={'.pdf'}
                  />
                  <FileInput<UploadFormSchema>
                    {...baseInputProps}
                    label={t('uploadDocuments.verification.report')}
                    required
                    name="verification_report"
                    accept={'.pdf'}
                  />
                  <Input<UploadFormSchema>
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
