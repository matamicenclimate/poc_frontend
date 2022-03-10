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
import { Breadcrumb } from '@/componentes/Elements/Breadcrumb/Breadcrumb';
import { allCountries } from 'country-region-data';
import { validationSchema } from '../validation/FormValidation';

export const Upload = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const uploadDocuments = uploadDocument();
  const formOption = getFormOptions();
  const user = useAuth();

  const handleSubmit = async (data: Record<string, any>) => {
    await uploadDocuments.mutateAsync(data);
    setIsOpen((old) => !old);
  };

  const parseCountries = allCountries.map((country) => {
    return {
      value: country[1],
      label: country[0],
    };
  });

  const formOptionToSelectOption = (options: FormOption[] | undefined): SelectOption[] => {
    if (options === undefined) return [];
    return options.map((option) => ({
      value: option.id,
      label: option.name,
    }));
  };

  return (
    <MainLayout title={t('head.Upload.title')}>
      <Breadcrumb
        links={[
          { to: '/documents', label: t('documents.List.breadcrumbTitle') },
          {
            to: `/documents/upload`,
            label: t('documents.Upload.title'),
          },
        ]}
      />
      <h1 className="mb-4">{t('uploadDocuments.title')}</h1>
      <>
        <Form
          onSubmit={handleSubmit}
          className="grid grid-cols-2"
          validationSchema={validationSchema}
        >
          <Select
            wrapperClassName="col-span-2"
            label={t('uploadDocuments.project.type')}
            required
            name="project-types"
            options={formOptionToSelectOption(formOption.data?.['project-types'])}
          />

          <Input
            wrapperClassName="col-span-2"
            label={t('uploadDocuments.project.title')}
            required
            name="title"
            type="text"
          />

          <Select
            wrapperClassName="col-span-2"
            label={t('uploadDocuments.sdgs')}
            name="sdgs"
            options={formOptionToSelectOption(formOption.data?.sdgs)}
            isMulti
          />

          <Input
            wrapperClassName="col-span-2"
            label={t('uploadDocuments.description')}
            required
            name="description"
            type="text"
          />

          <Select
            wrapperClassName="col-span-2"
            label={t('uploadDocuments.country')}
            name="country"
            required
            options={(parseCountries as SelectOption[]) ?? []}
          />

          <Input
            wrapperClassName="col-span-2"
            label={t('uploadDocuments.project.url')}
            required
            name="project_url"
            type="text"
          />

          <Input
            wrapperClassName="col-span-1"
            label={t('uploadDocuments.projectLatitude')}
            name="project_latitude"
            type="number"
            step="any"
          />

          <Input
            wrapperClassName="col-span-1"
            label={t('uploadDocuments.projectLongitude')}
            name="project_longitude"
            type="number"
            step="any"
          />

          <Input
            wrapperClassName="col-span-2"
            label={t('uploadDocuments.projectThumbnail')}
            required
            name="thumbnail"
            type="file"
            accept={'.png' || '.jpg' || '.jpeg'}
          />

          <Input
            wrapperClassName="col-span-2"
            label={t('uploadDocuments.projectCover')}
            required
            name="cover"
            type="file"
            accept={'.png' || '.jpg' || '.jpeg'}
          />

          <Input
            wrapperClassName="col-span-2"
            label={t('uploadDocuments.project.registration')}
            required
            name="project_registration"
            type="date"
          />

          <Input
            wrapperClassName="col-span-2"
            label={t('uploadDocuments.project.video')}
            name="project_video"
            type="text"
          />

          {/* To do: option to introduce a custom value */}
          <Select
            wrapperClassName="col-span-2"
            label={t('uploadDocuments.type')}
            required
            name="types"
            options={formOptionToSelectOption(formOption.data?.types)}
          />

          {/* To do: option to introduce a custom value */}
          <Select
            wrapperClassName="col-span-2"
            label={t('uploadDocuments.subtype')}
            required
            name="sub-types"
            options={formOptionToSelectOption(formOption.data?.['sub-types'])}
          />

          {/* To do: option to introduce a custom value */}
          <Select
            wrapperClassName="col-span-2"
            label={t('uploadDocuments.methodology')}
            name="methodologies"
            options={formOptionToSelectOption(formOption.data?.methodologies)}
          />

          <Input
            wrapperClassName="col-span-2"
            label={t('uploadDocuments.project.creditStart')}
            required
            name="credit_start"
            type="date"
          />
          <Input
            wrapperClassName="col-span-2"
            label={t('uploadDocuments.project.creditEnd')}
            required
            name="credit_end"
            type="date"
          />

          {/* To do: option to introduce a custom value */}
          <Select
            wrapperClassName="col-span-2"
            label={t('uploadDocuments.validator')}
            name="validators"
            options={formOptionToSelectOption(formOption.data?.validators)}
          />

          {/* To do: option to introduce a custom value */}
          <Select
            wrapperClassName="col-span-2"
            label={t('uploadDocuments.firstVerifier')}
            name="first-verifiers"
            options={formOptionToSelectOption(formOption.data?.['first-verifiers'])}
          />

          {/* To do: option to introduce a custom value */}
          <Select
            wrapperClassName="col-span-2"
            label={t('uploadDocuments.standard')}
            required
            name="standard"
            options={formOptionToSelectOption(formOption.data?.standards)}
          />

          <Select
            wrapperClassName="col-span-2"
            label={t('uploadDocuments.registry.name')}
            required
            name="registries"
            options={formOptionToSelectOption(formOption.data?.registries)}
          />

          <Input
            wrapperClassName="col-span-2"
            label={t('uploadDocuments.credits.amount')}
            required
            name="credits"
            type="number"
          />

          <Input
            wrapperClassName="col-span-2"
            label={t('uploadDocuments.serialNumber')}
            required
            name="serial_number"
            type="text"
          />

          <Input
            wrapperClassName="col-span-2"
            label={t('uploadDocuments.registry.link')}
            required
            name="registry_url"
            type="text"
          />

          <Input
            wrapperClassName="col-span-2"
            label={t('uploadDocuments.PDD')}
            required
            name="pdd"
            type="file"
            accept={'.pdf'}
          />

          <Input
            wrapperClassName="col-span-2"
            label={t('uploadDocuments.validation.report')}
            name="validation_report"
            type="file"
            accept={'.pdf'}
          />

          <Input
            wrapperClassName="col-span-2"
            label={t('uploadDocuments.monitoring.report')}
            name="monitoring_report"
            type="file"
            accept={'.pdf'}
          />

          <Input
            wrapperClassName="col-span-2"
            label={t('uploadDocuments.verification.report')}
            required
            name="verification_report"
            type="file"
            accept={'.pdf'}
          />

          <Input
            wrapperClassName="col-span-2"
            type="hidden"
            name="created_by_user"
            defaultValue={user.user?.email as string}
          />
        </Form>

        <Button type="submit" size="md" disabled={uploadDocuments.isLoading}>
          {t('uploadDocuments.send.button')}
        </Button>

        <Dialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title={t('uploadDocuments.modal.title')}
          claim={t('uploadDocuments.modal.claim')}
          acceptLabel={t('uploadDocuments.modal.button.accept')}
        />
      </>
    </MainLayout>
  );
};
